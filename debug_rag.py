from google import genai
import sys
import os

# Get API key from environment variable
API_KEY = os.getenv('GEMINI_API_KEY')
if not API_KEY:
    print("Error: GEMINI_API_KEY environment variable not set!")
    print("Please set your API key: export GEMINI_API_KEY='your-api-key-here'")
    sys.exit(1)

client = genai.Client(api_key=API_KEY)

def list_stores():
    print("\n=== Your File Search Stores ===")
    try:
        stores = list(client.file_search_stores.list())
        if not stores:
            print("No File Search Stores found.")
            return []

        print(f"Found {len(stores)} stores:")
        for i, store in enumerate(stores):
            print(f"\n{i+1}. Display Name: {store.display_name}")
            print(f"   ID: {store.name}")
            if hasattr(store, 'create_time'):
                print(f"   Created: {store.create_time}")
            if hasattr(store, 'document_count'):
                print(f"   Document Count: {store.document_count}")
        return stores
    except Exception as e:
        print(f"Error listing stores: {e}")
        return []

def list_files_in_store(store_name):
    print(f"\n=== Files in {store_name} ===")
    try:
        # List documents in the store
        documents = client.file_search_stores.documents.list(parent=store_name)

        count = 0
        for doc in documents:
            count += 1
            print(f"\nDocument {count}:")
            print(f"  Name: {doc.name}")
            print(f"  Display Name: {getattr(doc, 'display_name', 'N/A')}")
            if hasattr(doc, 'size_bytes'):
                print(f"  Size: {doc.size_bytes} bytes")
            if hasattr(doc, 'create_time'):
                print(f"  Created: {doc.create_time}")

        if count == 0:
            print("No documents found in this store.")
        return count
    except Exception as e:
        print(f"Error listing files: {e}")
        return 0

def check_store_details(store_name):
    print(f"\n=== Store Details: {store_name} ===")
    try:
        store = client.file_search_stores.get(name=store_name)
        print(f"Display Name: {store.display_name}")
        print(f"Name: {store.name}")
        print(f"State: {getattr(store, 'state', 'N/A')}")
        if hasattr(store, 'create_time'):
            print(f"Created: {store.create_time}")
        if hasattr(store, 'update_time'):
            print(f"Updated: {store.update_time}")

        # Try to get document count
        doc_count = list_files_in_store(store_name)
        print(f"Total Documents: {doc_count}")

    except Exception as e:
        print(f"Error getting store details: {e}")

def main():
    print("=== Gemini RAG Debug Tool ===")

    # List all stores
    stores = list_stores()

    if stores:
        print("\n" + "="*50)

        # Show details for each store
        for store in stores:
            check_store_details(store.name)

            # List files in this store
            list_files_in_store(store.name)
            print("\n" + "-"*50)
    else:
        print("\nNo stores found. You can create a new store using the Gemini API.")

if __name__ == "__main__":
    main()