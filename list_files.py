from google import genai
import sys
import os

# Get API key from environment variable
API_KEY = os.getenv('GEMINI_API_KEY')
if not API_KEY:
    print("Error: GEMINI_API_KEY environment variable not set!")
    sys.exit(1)

client = genai.Client(api_key=API_KEY)

def list_files_in_store(store_name):
    print(f"\n=== Files in {store_name} ===")
    try:
        # List documents in the store
        files = client.file_search_stores.documents.list(parent=store_name)

        count = 0
        print(f"\nDocuments found:")
        for f in files:
            count += 1
            print(f"\n{count}. Document Name: {f.name}")
            print(f"   Display Name: {getattr(f, 'display_name', 'N/A')}")
            print(f"   Full ID: {f.name}")

            # Try to get metadata if available
            if hasattr(f, 'custom_metadata') and f.custom_metadata:
                print("   Metadata:")
                for metadata in f.custom_metadata:
                    key = getattr(metadata, 'key', 'N/A')
                    if hasattr(metadata, 'string_value'):
                        value = metadata.string_value
                        print(f"     {key}: {value}")
                    elif hasattr(metadata, 'numeric_value'):
                        value = metadata.numeric_value
                        print(f"     {key}: {value}")

            if hasattr(f, 'size_bytes'):
                print(f"   Size: {f.size_bytes:,} bytes")

            if hasattr(f, 'create_time'):
                print(f"   Created: {f.create_time}")

        if count == 0:
            print("No documents found in this store.")
            print("\nPossible reasons:")
            print("1. Store is empty")
            print("2. Store ID is incorrect")
            print("3. Documents are still being processed")

        return count

    except Exception as e:
        print(f"\n❌ Error listing files: {e}")
        print(f"Store ID: {store_name}")
        print("\nPossible causes:")
        print("1. Store ID is incorrect (must start with 'fileSearchStores/')")
        print("2. Store doesn't exist or was deleted")
        print("3. No permissions to access this store")
        print("4. Store name format error")
        return 0

def main():
    if len(sys.argv) < 2:
        print("Usage:")
        print("  python3 list_files.py <store_id>")
        print("\nExample:")
        print("  python3 list_files.py fileSearchStores/n8ndocumentsstore-36kwhqn3cpcv")
        return

    store_name = sys.argv[1]

    print(f"Attempting to list files in store: {store_name}")
    list_files_in_store(store_name)

if __name__ == "__main__":
    main()