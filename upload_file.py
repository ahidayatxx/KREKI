from google import genai
from google.genai import types
import time
import os

client = genai.Client()

# --- Configuration ---
# Give your File Search Store a meaningful name. This will be visible in citations.
# IMPORTANT: Replace 'your-unique-file-search-store-name' with a globally unique name.
FILE_SEARCH_STORE_DISPLAY_NAME = 'ah-rag' 
# The actual file on your local system to upload
# IMPORTANT: Replace 'sample.txt' with the actual path to your file.
LOCAL_FILE_PATH = '/Users/ahmadhidayat/claude-code/upload-to-Gemini-File-Search/SATUSEHAT-strategic-emr.md' 
# The display name for the file once it's in the store (can be different from local filename)
FILE_DISPLAY_NAME_IN_STORE = 'SATUSEHAT-strategic-emr'
# --- End Configuration ---

# Check if the local file exists
if not os.path.exists(LOCAL_FILE_PATH):
    print(f"Error: The file '{LOCAL_FILE_PATH}' does not exist.")
    print("Please make sure the file is in the correct directory or provide the full path.")
    exit()

# 1. Create a File Search Store
print(f"Creating File Search Store: {FILE_SEARCH_STORE_DISPLAY_NAME}...")
try:
    file_search_store = client.file_search_stores.create(
        config={'display_name': FILE_SEARCH_STORE_DISPLAY_NAME}
    )
    print(f"Created File Search Store: {file_search_store.name}")
except Exception as e:
    # Attempt to retrieve if it already exists
    if "already exists" in str(e):
        print(f"File Search Store '{FILE_SEARCH_STORE_DISPLAY_NAME}' already exists. Retrieving it.")
        file_search_store = client.file_search_stores.get(name=f"fileSearchStores/{FILE_SEARCH_STORE_DISPLAY_NAME}")
    else:
        print(f"Error creating or retrieving File Search Store: {e}")
        exit()


# 2. Upload the file using files.upload then import to store
print(f"Uploading file '{LOCAL_FILE_PATH}'...")
try:
    # Step 2a: Upload the file explicitly
    uploaded_file = client.files.upload(
        file=LOCAL_FILE_PATH,
        config={
            'display_name': FILE_DISPLAY_NAME_IN_STORE,
            'mime_type': 'text/markdown' 
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
            exit()
        
        if hasattr(operation, 'metadata') and operation.metadata:
             print(f"Operation status: {operation.metadata.state}")
        else:
             print("Processing...")

    print(f"File '{LOCAL_FILE_PATH}' imported successfully to {file_search_store.name}.")

except Exception as e:
    print(f"Error during file upload/import: {e}")
    exit()

# 3. Query with the File Search Tool
#    You can now use this file_search_store in your generate_content calls.
#    The 'contents' will be augmented by relevant information from your uploaded file.
question = "what is SATUSEHAT EMR?"
print(f"\nQuerying the model with the uploaded file context: '{question}'")
try:
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=question,
        config=types.GenerateContentConfig(
            tools=[
                types.Tool(
                    file_search=types.FileSearch(
                        file_search_store_names=[file_search_store.name]
                    )
                )
            ]
        )
    )

    print("\nModel Response:")
    print(response.text)
except Exception as e:
    print(f"Error during model query: {e}")

# Optional: Delete the File Search Store if you no longer need it.
# Be careful with this, as it removes all indexed data.
# print(f"\nDeleting File Search Store: {file_search_store.name}...")
# client.file_search_stores.delete(name=file_search_store.name, config={'force': True})
# print(f"File Search Store {file_search_store.name} deleted.")
