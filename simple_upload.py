from google import genai
from google.genai import types
import time
import os
import argparse
import sys

# Common MIME types by extension
MIME_TYPES = {
    '.txt': 'text/plain',
    '.md': 'text/markdown',
    '.html': 'text/html',
    '.pdf': 'application/pdf',
    '.json': 'application/json',
    '.csv': 'text/csv',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
}

# Hardcoded target store
TARGET_STORE_ID = 'fileSearchStores/ahrag-3zk10hdbmrnt'

def get_mime_type(file_path):
    ext = os.path.splitext(file_path)[1].lower()
    return MIME_TYPES.get(ext, 'application/octet-stream') # Default to generic if unknown

def main():
    parser = argparse.ArgumentParser(description="Upload a file to a specific Gemini File Search Store.")
    parser.add_argument("file_path", help="Path to the file to upload.")
    parser.add_argument("--file_display_name", 
                        help="Display name for the file in the store (defaults to basename of file_path).")
    parser.add_argument("--mime_type", 
                        help=f"MIME type of the file (e.g., text/markdown). Auto-detected if not provided for common types. Supported: {', '.join(MIME_TYPES.keys())}")
    
    args = parser.parse_args()

    client = genai.Client()

    local_file_path = args.file_path
    file_display_name_in_store = args.file_display_name if args.file_display_name else os.path.basename(local_file_path)
    explicit_mime_type = args.mime_type if args.mime_type else get_mime_type(local_file_path)

    if not os.path.exists(local_file_path):
        print(f"Error: The file '{local_file_path}' does not exist.")
        sys.exit(1)
    
    print(f"Using MIME type: {explicit_mime_type}")

    # Directly use the target store
    print(f"Attempting to upload to File Search Store: '{TARGET_STORE_ID}'...")
    try:
        file_search_store = client.file_search_stores.get(name=TARGET_STORE_ID)
        print(f"Connected to File Search Store: {file_search_store.name} (Display Name: {file_search_store.display_name})")
    except Exception as e:
        print(f"Error: Could not connect to File Search Store '{TARGET_STORE_ID}'.")
        print(f"Details: {e}")
        sys.exit(1)


    # 2. Upload the file using files.upload then import to store
    print(f"Uploading file '{local_file_path}' (as '{file_display_name_in_store}') to Gemini Files API...")
    try:
        # Step 2a: Upload the file explicitly
        uploaded_file = client.files.upload(
            file=local_file_path,
            config={
                'display_name': file_display_name_in_store,
                'mime_type': explicit_mime_type 
            }
        )
        print(f"File uploaded to Gemini Files API: {uploaded_file.name}")

        # Step 2b: Import the file into the File Search Store
        print(f"Importing file to store {file_search_store.name}...")
        operation = client.file_search_stores.import_file(
            file_search_store_name=file_search_store.name,
            file_name=uploaded_file.name
        )

        print("Import operation started. Waiting for completion...")
        while not operation.done:
            time.sleep(5)
            operation = client.operations.get(operation)
            if operation.error:
                print(f"Error during import operation: {operation.error}")
                sys.exit(1)
            
            if hasattr(operation, 'metadata') and operation.metadata:
                print(f"Operation status: {operation.metadata.state}")
            else:
                print("Processing...")

        print(f"File '{local_file_path}' imported successfully to {file_search_store.name}.")

    except Exception as e:
        print(f"Error during file upload/import: {e}")
        sys.exit(1)

    print("\nUpload and import process completed successfully!")

if __name__ == "__main__":
    main()