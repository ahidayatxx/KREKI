import sys
import os

# Add the current directory to Python path
sys.path.append('.')

# Import the functions from manage_rag
from manage_rag import list_stores, list_files_in_store, delete_store, delete_file_from_store, client
from google import genai

# Set API key
API_KEY = os.getenv('GEMINI_API_KEY')
if not API_KEY:
    print("Error: GEMINI_API_KEY environment variable not set!")
    sys.exit(1)

def main():
    # Parse command line arguments
    if len(sys.argv) < 2:
        print("Usage:")
        print("  python3 run_rag_command.py list-stores")
        print("  python3 run_rag_command.py list-files <store_id>")
        print("  python3 run_rag_command.py delete-store <store_id>")
        print("  python3 run_rag_command.py delete-file <store_id> <file_id>")
        return

    command = sys.argv[1]

    if command == "list-stores":
        list_stores()
    elif command == "list-files":
        if len(sys.argv) < 3:
            print("Error: Please provide store ID")
            print("Usage: python3 run_rag_command.py list-files <store_id>")
            return
        list_files_in_store(sys.argv[2])
    elif command == "delete-store":
        if len(sys.argv) < 3:
            print("Error: Please provide store ID")
            print("Usage: python3 run_rag_command.py delete-store <store_id>")
            return

        store_name = sys.argv[2]
        print(f"Deleting store: {store_name}")
        try:
            client.file_search_stores.delete(name=store_name)
            print(f"Successfully deleted store: {store_name}")
        except Exception as e:
            print(f"Error deleting store: {e}")
    elif command == "delete-file":
        if len(sys.argv) < 4:
            print("Error: Please provide store ID and file ID")
            print("Usage: python3 run_rag_command.py delete-file <store_id> <file_id>")
            return

        store_name = sys.argv[2]
        file_name = sys.argv[3]
        print(f"Deleting file {file_name} from store {store_name}")
        try:
            client.file_search_stores.documents.delete(name=file_name)
            print(f"Successfully deleted file: {file_name}")
        except Exception as e:
            print(f"Error deleting file: {e}")
    else:
        print(f"Unknown command: {command}")

if __name__ == "__main__":
    main()