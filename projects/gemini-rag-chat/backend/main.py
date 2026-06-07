"""
FastAPI Backend for Gemini RAG Chat Application
Integrates with Gemini File Search API for RAG functionality
"""

import os
import time
import uuid
import asyncio
import httpx
from typing import List, Optional, Dict, Any
from contextlib import asynccontextmanager

from fastapi import FastAPI, UploadFile, File, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

from google import genai


# Configuration
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
MODEL = "gemini-2.5-flash"
GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta"


# Store for active WebSocket connections and file search stores
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.file_search_stores: Dict[str, str] = {}  # session_id -> store_name

    async def connect(self, websocket: WebSocket, session_id: str):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)


manager = ConnectionManager()


# Initialize Gemini client
def get_gemini_client():
    if not GEMINI_API_KEY:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY not set")
    return genai.Client(api_key=GEMINI_API_KEY)


# HTTP client for REST API calls
def get_http_client():
    return httpx.AsyncClient(timeout=60.0)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("Starting Gemini RAG Chat Backend...")
    yield
    # Shutdown
    print("Shutting down Gemini RAG Chat Backend...")


app = FastAPI(
    title="Gemini RAG Chat API",
    description="RAG Chat Application using Gemini File Search API",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request/Response Models
class ChatRequest(BaseModel):
    message: str
    session_id: str
    use_file_search: bool = True


class ChatResponse(BaseModel):
    response: str
    citations: Optional[List[Dict[str, Any]]] = None


class FileSearchStoreInfo(BaseModel):
    store_name: str
    display_name: str
    document_count: int


# Health Check
@app.get("/health")
async def health_check():
    return {"status": "healthy", "model": MODEL}


# ============== File Search Store Management (REST API) ==============

async def create_file_search_store_rest(display_name: str) -> Dict[str, Any]:
    """Create a File Search Store using REST API"""
    url = f"{GEMINI_BASE_URL}/fileSearchStores?key={GEMINI_API_KEY}"
    payload = {"displayName": display_name}

    async with get_http_client() as client:
        response = await client.post(url, json=payload)
        response.raise_for_status()
        return response.json()


async def upload_to_file_search_store_rest(file_path: str, store_name: str, display_name: str) -> str:
    """Upload file to File Search Store using REST API"""
    # First, upload the file to Files API
    files_url = f"{GEMINI_BASE_URL}/files?key={GEMINI_API_KEY}"

    async with get_http_client() as client:
        # Upload file
        with open(file_path, "rb") as f:
            files = {"file": (display_name, f, "application/octet-stream")}
            metadata = {"displayName": display_name}
            files_response = await client.post(
                files_url,
                data={"file": (display_name, f, "application/octet-stream")},
                headers={"x-goog-upload-protocol": "resumable"}
            )

        # Alternative: simpler upload using multipart
        with open(file_path, "rb") as f:
            file_content = f.read()
            # Use resumable upload
            init_response = await client.post(
                f"{GEMINI_BASE_URL}/uploadToFileSearchStore?key={GEMINI_API_KEY}",
                headers={
                    "X-Goog-Upload-Protocol": "resumable",
                    "X-Goog-Upload-Command": "start",
                    "X-Goog-Upload-Header-Content-Length": str(len(file_content)),
                    "X-Goog-Upload-Header-DisplayName": display_name,
                    "X-Goog-Upload-Header-FileSearchStoreName": store_name,
                }
            )

            upload_url = init_response.headers.get("X-Goog-Upload-URL")
            if not upload_url:
                raise HTTPException(status_code=500, detail="Failed to get upload URL")

            # Upload the file content
            upload_response = await client.post(
                upload_url,
                content=file_content,
                headers={
                    "X-Goog-Upload-Command": "upload, finalize",
                    "X-Goog-Upload-Offset": "0",
                }
            )

            if upload_response.status_code != 200:
                raise HTTPException(status_code=500, detail=f"Upload failed: {upload_response.text}")

            return upload_response.json().get("name", "")


# ============== Endpoints ==============

# Create File Search Store for a session
@app.post("/api/file-search-store", response_model=FileSearchStoreInfo)
async def create_file_search_store(session_id: str, display_name: Optional[str] = None):
    """Create a new File Search Store for a session"""
    try:
        if not display_name:
            display_name = f"rag-store-{session_id[:8]}"

        # Using REST API directly since Python SDK doesn't have File Search yet
        result = await create_file_search_store_rest(display_name)
        store_name = result.get("name", "")

        manager.file_search_stores[session_id] = store_name

        return FileSearchStoreInfo(
            store_name=store_name,
            display_name=display_name,
            document_count=0
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Select store for session
@app.post("/api/select-store")
async def select_store(request: dict):
    """Associate a File Search Store with a session for chat"""
    try:
        session_id = request.get("session_id")
        store_name = request.get("store_name")

        if not session_id or not store_name:
            raise HTTPException(status_code=400, detail="session_id and store_name required")

        manager.file_search_stores[session_id] = store_name

        return {"status": "success", "store_name": store_name}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Upload file to File Search Store
@app.post("/api/upload-file")
async def upload_to_file_search(
    file: UploadFile = File(...),
    session_id: Optional[str] = None,
    display_name: Optional[str] = None,
    store_name: Optional[str] = None
):
    """Upload a file using two-step process: upload to Files API, then import to File Search Store"""
    import requests

    try:
        content = await file.read()
        file_display_name = display_name or file.filename

        # Determine which file search store to use
        target_store_name = None

        # Priority 1: Explicit store_name from request
        if store_name:
            target_store_name = store_name
        # Priority 2: Session's associated store
        elif session_id and session_id in manager.file_search_stores:
            target_store_name = manager.file_search_stores[session_id]
        # Priority 3: Create a new store
        else:
            store_display_name = f"rag-store-{uuid.uuid4().hex[:8]}"
            result = await create_file_search_store_rest(store_display_name)
            target_store_name = result.get("name", "")
            if session_id:
                manager.file_search_stores[session_id] = target_store_name

        # Step 1: Upload file to Files API using resumable upload protocol
        # Correct endpoint: POST https://generativelanguage.googleapis.com/v1beta/files
        files_url = f"{GEMINI_BASE_URL}/files?key={GEMINI_API_KEY}"

        # Initialize resumable upload
        init_headers = {
            "X-Goog-Upload-Protocol": "resumable",
            "X-Goog-Upload-Command": "start",
            "X-Goog-Upload-Header-Content-Length": str(len(content)),
            "X-Goog-Upload-Header-Content-Type": file.content_type or "application/pdf",
        }
        init_body = {"file": {"display_name": file_display_name}}

        init_response = requests.post(files_url, headers=init_headers, json=init_body)
        if init_response.status_code != 200:
            print(f"Init upload failed: {init_response.status_code} - {init_response.text}")
            # Try simpler approach - direct upload
            print("Trying direct upload approach...")
            files = {'file': (file.filename, content, file.content_type or 'application/pdf')}
            data = {'display_name': file_display_name}
            direct_response = requests.post(f"{GEMINI_BASE_URL}/files?key={GEMINI_API_KEY}", files=files, data=data)
            if direct_response.status_code not in [200, 201]:
                raise HTTPException(status_code=500, detail=f"Upload failed: {direct_response.text}")
            file_data = direct_response.json()
        else:
            upload_url = init_response.headers.get("X-Goog-Upload-URL")
            if not upload_url:
                raise HTTPException(status_code=500, detail="No upload URL received")

            # Upload the file content
            upload_headers = {
                "X-Goog-Upload-Command": "upload, finalize",
                "X-Goog-Upload-Offset": "0",
                "Content-Length": str(len(content)),
            }
            upload_response = requests.post(upload_url, headers=upload_headers, data=content)

            if upload_response.status_code != 200:
                print(f"Upload content failed: {upload_response.status_code} - {upload_response.text}")
                raise HTTPException(status_code=500, detail=f"Failed to upload file: {upload_response.text}")

            file_data = upload_response.json()

        gemini_file_name = file_data.get("name", "")
        if not gemini_file_name:
            raise HTTPException(status_code=500, detail="No file name returned from upload")

        # Step 2: Import the file to the File Search Store
        # URL: POST /v1beta/{fileSearchStoreName}:importFile
        encoded_store_name = target_store_name.replace("/", "%2F")
        import_url = f"{GEMINI_BASE_URL}/{encoded_store_name}:importFile?key={GEMINI_API_KEY}"

        import_body = {"file_name": gemini_file_name}
        import_response = requests.post(import_url, json=import_body)

        if import_response.status_code not in [200, 201]:
            print(f"Import failed: {import_response.status_code} - {import_response.text}")
            raise HTTPException(status_code=500, detail=f"Failed to import file to store: {import_response.text}")

        result_data = import_response.json()

        # If it's a long-running operation, wait for completion
        if "name" in result_data and "done" in result_data:
            operation_name = result_data["name"]
            if not result_data["done"]:
                # Wait for operation to complete
                max_wait = 120  # 2 minutes
                waited = 0

                while waited < max_wait:
                    check_url = f"{GEMINI_BASE_URL}/{operation_name.replace('/', '%2F')}?key={GEMINI_API_KEY}"
                    check_response = requests.get(check_url)

                    if check_response.status_code == 200:
                        check_data = check_response.json()
                        if check_data.get("done", False):
                            if "error" in check_data:
                                raise HTTPException(status_code=500, detail=f"Operation failed: {check_data['error']}")
                            result_data = check_data
                            break

                    await asyncio.sleep(3)
                    waited += 3

                if waited >= max_wait:
                    raise HTTPException(status_code=500, detail="Import operation timed out")

        return {
            "status": "success",
            "store_name": target_store_name,
            "filename": file.filename,
            "gemini_file_name": gemini_file_name,
            "message": "File uploaded and indexed successfully"
        }

    except HTTPException:
        raise
    except Exception as e:
        import traceback
        print(f"Error uploading file: {e}")
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))


# Chat endpoint with File Search
@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Process chat message with File Search RAG using REST API"""
    try:
        # Use REST API directly since SDK doesn't support FileSearch yet
        url = f"{GEMINI_BASE_URL}/models/{MODEL}:generateContent?key={GEMINI_API_KEY}"

        # Build request body
        contents = [{"parts": [{"text": request.message}]}]

        # Add File Search tool if enabled
        tools = []
        if request.use_file_search and request.session_id in manager.file_search_stores:
            store_name = manager.file_search_stores[request.session_id]
            tools = [{
                "file_search": {
                    "file_search_store_names": [store_name]
                }
            }]

        payload = {"contents": contents}
        if tools:
            payload["tools"] = tools

        async with get_http_client() as client:
            response = await client.post(url, json=payload)
            response.raise_for_status()
            data = response.json()

        # Extract response text
        response_text = ""
        citations = []

        if "candidates" in data and len(data["candidates"]) > 0:
            candidate = data["candidates"][0]
            if "content" in candidate and "parts" in candidate["content"]:
                for part in candidate["content"]["parts"]:
                    if "text" in part:
                        response_text += part["text"]

            # Extract citations from grounding metadata
            if "groundingMetadata" in candidate:
                gm = candidate["groundingMetadata"]
                if "groundingChunks" in gm:
                    for chunk in gm["groundingChunks"]:
                        citation = {}
                        if "web" in chunk:
                            citation["source"] = chunk["web"]
                        elif "source" in chunk:
                            citation["source"] = chunk["source"]
                        if "text" in chunk:
                            citation["text"] = chunk["text"]
                        citations.append(citation)

        return ChatResponse(
            response=response_text,
            citations=citations if citations else None
        )

    except Exception as e:
        import traceback
        print(f"Error in chat: {e}")
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))


# List File Search Stores
@app.get("/api/file-search-stores")
async def list_file_search_stores():
    """List all File Search Stores"""
    try:
        url = f"{GEMINI_BASE_URL}/fileSearchStores?key={GEMINI_API_KEY}"

        async with get_http_client() as client:
            response = await client.get(url)
            response.raise_for_status()
            data = response.json()
            return {"stores": data.get("fileSearchStores", [])}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Get File Search Store details
@app.get("/api/file-search-store/")
async def get_file_search_store(store_name: str):
    """Get details of a specific File Search Store"""
    import requests
    try:
        # The store_name already includes the fileSearchStores/ prefix
        # Use it directly in the URL path - Google API expects real slash, not encoded
        url = f"{GEMINI_BASE_URL}/{store_name}?key={GEMINI_API_KEY}"

        response = requests.get(url)
        response.raise_for_status()
        return response.json()

    except Exception as e:
        import traceback
        print(f"Error fetching store details: {e}")
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))


# Delete File Search Store
@app.delete("/api/file-search-store/")
async def delete_file_search_store(store_name: str, force: bool = False):
    """Delete a File Search Store"""
    import requests
    try:
        # The store_name already includes the fileSearchStores/ prefix
        # Use it directly in the URL path - Google API expects real slash, not encoded
        url = f"{GEMINI_BASE_URL}/{store_name}?key={GEMINI_API_KEY}&force={force}"

        response = requests.delete(url)
        response.raise_for_status()
        return {"status": "success", "message": f"Store {store_name} deleted"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# WebSocket endpoint for streaming chat
@app.websocket("/ws/chat/{session_id}")
async def websocket_chat(websocket: WebSocket, session_id: str):
    """WebSocket endpoint for streaming chat responses"""
    await manager.connect(websocket, session_id)

    try:
        # Validate API key on connection
        if not GEMINI_API_KEY:
            await websocket.send_json({"error": "GEMINI_API_KEY not configured on server"})
            await websocket.close()
            return

        client = get_gemini_client()

        while True:
            try:
                data = await websocket.receive_json()
                message = data.get("message")
                use_file_search = data.get("use_file_search", True)

                if not message:
                    await websocket.send_json({"error": "No message provided"})
                    continue

                # Use REST API directly since SDK doesn't support FileSearch yet
                url = f"{GEMINI_BASE_URL}/models/{MODEL}:generateContent?key={GEMINI_API_KEY}"

                # Build request body
                contents = [{"parts": [{"text": message}]}]

                # Add File Search tool if enabled
                tools = []
                if use_file_search and session_id in manager.file_search_stores:
                    store_name = manager.file_search_stores[session_id]
                    tools = [{
                        "file_search": {
                            "file_search_store_names": [store_name]
                        }
                    }]

                payload = {"contents": contents}
                if tools:
                    payload["tools"] = tools

                async with get_http_client() as http_client:
                    response = await http_client.post(url, json=payload)
                    response.raise_for_status()
                    data = response.json()

                # Extract response text
                response_text = ""
                citations = []

                if "candidates" in data and len(data["candidates"]) > 0:
                    candidate = data["candidates"][0]
                    if "content" in candidate and "parts" in candidate["content"]:
                        for part in candidate["content"]["parts"]:
                            if "text" in part:
                                response_text += part["text"]

                    # Extract citations from grounding metadata
                    if "groundingMetadata" in candidate:
                        gm = candidate["groundingMetadata"]
                        if "groundingChunks" in gm:
                            for chunk in gm["groundingChunks"]:
                                citation = {}
                                if "web" in chunk:
                                    citation["source"] = chunk["web"]
                                elif "source" in chunk:
                                    citation["source"] = chunk["source"]
                                if "text" in chunk:
                                    citation["text"] = chunk["text"]
                                citations.append(citation)

                await websocket.send_json({
                    "response": response_text,
                    "citations": citations if citations else None
                })

            except Exception as e:
                import traceback
                print(f"Error in WebSocket message handling: {e}")
                print(traceback.format_exc())
                await websocket.send_json({"error": f"Error processing message: {str(e)}"})

    except WebSocketDisconnect:
        manager.disconnect(websocket)
        print(f"WebSocket disconnected: {session_id}")
    except Exception as e:
        import traceback
        print(f"WebSocket error: {e}")
        print(traceback.format_exc())
        try:
            await websocket.send_json({"error": f"Connection error: {str(e)}"})
        except:
            pass


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
