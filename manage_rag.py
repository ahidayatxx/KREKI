from google import genai
from google.genai import types
import sys
import os
import json
import time

# Get API key from environment variable
API_KEY = os.getenv('GEMINI_API_KEY')
if not API_KEY:
    print("Error: GEMINI_API_KEY environment variable not set!")
    print("Please set your API key: export GEMINI_API_KEY='your-api-key-here'")
    sys.exit(1)

client = genai.Client(api_key=API_KEY)

def list_stores():
    print("\n--- Your File Search Stores ---")
    try:
        stores = list(client.file_search_stores.list())
        if not stores:
            print("No File Search Stores found.")
            return

        print(f"Found {len(stores)} store(s):")
        for i, store in enumerate(stores):
            print(f"\n{i+1}. Display Name: {store.display_name}")
            print(f"   ID: {store.name}")

            # Get additional details if available
            try:
                store_details = client.file_search_stores.get(name=store.name)
                if hasattr(store_details, 'create_time'):
                    print(f"   Created: {store_details.create_time}")
                if hasattr(store_details, 'document_count'):
                    print(f"   Document Count: {store_details.document_count}")
                if hasattr(store_details, 'state'):
                    print(f"   State: {store_details.state}")
            except:
                pass

            print("-" * 50)
    except Exception as e:
        print(f"Error listing stores: {e}")
        print("Tip: Check if your API key has File Search API permissions")

def list_files_in_store():
    store_name = input("\nEnter the Store ID (e.g., fileSearchStores/xxx): ").strip()
    if not store_name: return

    print(f"\n--- Files in {store_name} ---")
    try:
        # Corrected method to list documents in a store
        files = client.file_search_stores.documents.list(parent=store_name)

        count = 0
        print(f"\nDocuments found:")
        for f in files:
            count += 1
            print(f"\n{count}. Document Name: {f.name}")
            print(f"   Display Name: {getattr(f, 'display_name', 'N/A')}")

            # Try to get metadata if available
            if hasattr(f, 'custom_metadata') and f.custom_metadata:
                print("   Metadata:")
                for metadata in f.custom_metadata:
                    key = metadata.get('key', 'N/A')
                    if 'string_value' in metadata:
                        value = metadata['string_value']
                        print(f"     {key}: {value}")
                    elif 'numeric_value' in metadata:
                        value = metadata['numeric_value']
                        print(f"     {key}: {value}")

            if hasattr(f, 'size_bytes'):
                print(f"   Size: {f.size_bytes} bytes")

        if count == 0:
            print("No files found in this store.")
            print("\nTip: Make sure the store ID is correct and starts with 'fileSearchStores/'")

    except Exception as e:
        print(f"\nError listing files: {e}")
        print("Possible causes:")
        print("1. Store ID is incorrect (should start with 'fileSearchStores/')")
        print("2. Store doesn't exist or was deleted")
        print("3. No permissions to access this store")
        print("4. API doesn't have proper File Search permissions")

def delete_store():
    store_name = input("\nEnter the Store ID to DELETE (e.g., fileSearchStores/xxx): ").strip()
    if not store_name: return

    # Verify store exists first
    try:
        store = client.file_search_stores.get(name=store_name)
        print(f"\nStore found: {store.display_name}")
    except:
        print(f"\nError: Store '{store_name}' not found!")
        print("Tip: Use option 1 to list all available stores")
        return

    confirm = input(f"\nAre you sure you want to delete '{store.display_name}' ({store_name})? (yes/no): ").lower()
    if confirm != 'yes':
        print("Deletion cancelled.")
        return

    try:
        # Add force parameter as per documentation
        client.file_search_stores.delete(name=store_name, config={'force': True})
        print(f"Successfully deleted store: {store_name}")
        print("Note: All documents in this store have been permanently deleted")
    except Exception as e:
        print(f"Error deleting store: {e}")
        print("Tip: Make sure you have proper permissions and the store is not locked")

def delete_file_from_store():
    store_name = input("\nEnter the Store ID (e.g., fileSearchStores/xxx): ").strip()
    if not store_name:
        print("Error: Store ID is required")
        return

    # First list files to help user select
    print(f"\nListing files in {store_name}...")
    try:
        files = client.file_search_stores.documents.list(parent=store_name)
        files_list = list(files)

        if not files_list:
            print("No files found in this store.")
            return

        print("\nAvailable files:")
        for i, f in enumerate(files_list):
            display_name = getattr(f, 'display_name', f.name.split('/')[-1])
            print(f"  {i+1}. {display_name}")
            print(f"     Full ID: {f.name}")

        print("\nSelect file to delete:")
        for i in range(len(files_list)):
            print(f"  {i+1}. {getattr(files_list[i], 'display_name', files_list[i].name.split('/')[-1])}")

        choice = input(f"\nEnter file number (1-{len(files_list)}) or '0' to cancel: ").strip()

        if choice == '0':
            print("Deletion cancelled.")
            return

        try:
            file_index = int(choice) - 1
            if 0 <= file_index < len(files_list):
                file_name = files_list[file_index].name
                file_display = getattr(files_list[file_index], 'display_name', file_name.split('/')[-1])

                confirm = input(f"\nDelete file '{file_display}'? (yes/no): ").lower()
                if confirm == 'yes':
                    # Delete the document with force=True
                    client.file_search_stores.documents.delete(name=file_name, config={'force': True})
                    print(f"Successfully deleted file: {file_display}")
                else:
                    print("Deletion cancelled.")
            else:
                print("Invalid file number.")
        except ValueError:
            print("Invalid input. Please enter a number.")

    except Exception as e:
        print(f"Error accessing files: {e}")
        print("Tip: Check if the store ID is correct and you have proper permissions")

def upload_file_to_store():
    """New function to upload file to store"""
    file_path = input("\nEnter file path to upload: ").strip()
    if not file_path or not os.path.exists(file_path):
        print(f"Error: File '{file_path}' not found!")
        return

    # List stores to select from
    print("\nAvailable stores:")
    try:
        stores = list(client.file_search_stores.list())
        if not stores:
            print("No stores found. Please create one first.")
            return

        for i, store in enumerate(stores):
            print(f"  {i+1}. {store.display_name} ({store.name})")

        choice = input(f"\nSelect store (1-{len(stores)}) or press Enter to create new: ").strip()

        if choice:
            try:
                store_index = int(choice) - 1
                if 0 <= store_index < len(stores):
                    store_name = stores[store_index].name
                    store_display = stores[store_index].display_name
                    print(f"Selected store: {store_display}")
                else:
                    print("Invalid store number.")
                    return
            except ValueError:
                print("Invalid input.")
                return
        else:
            # Create new store
            display_name = input("Enter new store display name: ").strip()
            if not display_name:
                display_name = f"Store-{int(time.time())}"

            try:
                store = client.file_search_stores.create(config={'display_name': display_name})
                store_name = store.name
                print(f"Created new store: {display_name}")
            except Exception as e:
                print(f"Error creating store: {e}")
                return

        # Upload file
        print(f"\nUploading {file_path} to store...")
        try:
            # First upload the file
            uploaded_file = client.files.upload(
                file=file_path,
                config={'name': os.path.basename(file_path)}
            )

            # Then import to file search store
            operation = client.file_search_stores.import_file(
                file_search_store_name=store_name,
                file_name=uploaded_file.name
            )

            print("File uploaded and processing...")

            # Wait for operation to complete
            while not operation.done:
                time.sleep(2)
                operation = client.operations.get(operation)

            if operation.result:
                print(f"✅ Successfully uploaded and indexed: {os.path.basename(file_path)}")
            else:
                print(f"⚠️ Upload completed with warnings")

        except Exception as e:
            print(f"Error uploading file: {e}")

    except Exception as e:
        print(f"Error listing stores: {e}")

def main():
    while True:
        print("\n" + "="*50)
        print("=== Gemini RAG Manager ===")
        print("="*50)
        print("1. List All Stores")
        print("2. List Files in a Store")
        print("3. Delete a Store")
        print("4. Delete a File from a Store")
        print("5. Upload File to Store")
        print("6. Exit")
        print("="*50)

        choice = input("\nSelect an option (1-6): ").strip()

        if choice == '1':
            list_stores()
        elif choice == '2':
            list_files_in_store()
        elif choice == '3':
            delete_store()
        elif choice == '4':
            delete_file_from_store()
        elif choice == '5':
            upload_file_to_store()
        elif choice == '6':
            print("\nGoodbye! Thank you for using Gemini RAG Manager.")
            break
        else:
            print("\n❌ Invalid option. Please select a number between 1 and 6.")
            input("Press Enter to continue...")

def test_api():
    """Test API connectivity and permissions"""
    print("\n=== Testing Gemini API ===")
    try:
        # Test basic API access
        models = client.models.list()
        gemini_models = [m for m in models if 'gemini' in m.name.lower()]
        print(f"✅ API connection successful!")
        print(f"✅ Found {len(gemini_models)} Gemini models")

        # Test File Search API
        try:
            stores = list(client.file_search_stores.list())
            print(f"✅ File Search API accessible")
            print(f"ℹ️  Current stores: {len(stores)}")
        except Exception as e:
            print(f"⚠️  File Search API issue: {e}")
            print("   Make sure your API key has File Search permissions")

    except Exception as e:
        print(f"❌ API connection failed: {e}")
        print("   Check your API key and network connection")

if __name__ == "__main__":
    # First test API
    test_api()

    # Then run the main menu
    main()
