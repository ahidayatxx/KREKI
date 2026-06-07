from google import genai
from google.genai import types
import sys

client = genai.Client()

def list_available_stores():
    """List all available File Search stores and return them as a list"""
    print("Fetching available File Search stores...")
    stores = []

    try:
        for store in client.file_search_stores.list():
            stores.append(store)
    except Exception as e:
        print(f"Error listing stores: {e}")
        return []

    return stores

def select_store(stores):
    """Allow user to select a store from the list"""
    if not stores:
        print("No File Search stores found.")
        return None

    print("\nAvailable File Search Stores:")
    print("-" * 60)

    for i, store in enumerate(stores, 1):
        display_name = getattr(store, 'display_name', 'No display name')
        name = getattr(store, 'name', 'No name')
        created_time = getattr(store, 'create_time', 'Unknown')

        # Extract store ID from full name
        store_id = name.split('/')[-1] if '/' in name else name

        print(f"{i}. {display_name}")
        print(f"   ID: {store_id}")
        print(f"   Created: {created_time}")
        print()

    while True:
        try:
            choice = input(f"Select store (1-{len(stores)}) or enter store ID directly: ").strip()

            # Try to parse as number
            try:
                choice_num = int(choice)
                if 1 <= choice_num <= len(stores):
                    selected_store = stores[choice_num - 1]
                    print(f"\nSelected store: {getattr(selected_store, 'display_name', 'No display name')}")
                    return selected_store
                else:
                    print(f"Please enter a number between 1 and {len(stores)}")
                    continue
            except ValueError:
                # Treat as store ID
                for store in stores:
                    store_id = store.name.split('/')[-1] if '/' in store.name else store.name
                    if choice == store_id:
                        print(f"\nSelected store: {getattr(store, 'display_name', 'No display name')}")
                        return store

                # If not found by ID, try full name
                for store in stores:
                    if choice == store.name:
                        print(f"\nSelected store: {getattr(store, 'display_name', 'No display name')}")
                        return store

                print("Store ID not found. Please try again.")

        except KeyboardInterrupt:
            print("\nOperation cancelled.")
            return None

def main():
    print("=== Gemini File Search RAG Query Tool ===")
    print("This tool allows you to query documents in your File Search stores.\n")

    # Check for command line argument for store ID
    if len(sys.argv) > 1:
        store_id = sys.argv[1]
        print(f"Attempting to connect to store ID: {store_id}")

        # Try to find store by ID
        stores = list_available_stores()
        selected_store = None

        for store in stores:
            store_name_id = store.name.split('/')[-1] if '/' in store.name else store.name
            if store_id == store_name_id or store_id == store.name:
                selected_store = store
                break

        if not selected_store:
            print(f"Store with ID '{store_id}' not found.")
            print("Available stores:")
            for store in stores:
                store_name_id = store.name.split('/')[-1] if '/' in store.name else store.name
                print(f"  - {store_name_id}: {getattr(store, 'display_name', 'No display name')}")
            return
    else:
        # List stores and let user select
        stores = list_available_stores()

        if not stores:
            print("No File Search stores found. Please create a store first.")
            return

        selected_store = select_store(stores)

        if not selected_store:
            return

    # Connect to the selected store
    try:
        print(f"\nConnecting to File Search Store...")
        print(f"Store: {selected_store.name}")
        print(f"Display Name: {getattr(selected_store, 'display_name', 'No display name')}")

        # Get fresh store details
        store = client.file_search_stores.get(name=selected_store.name)

    except Exception as e:
        print(f"Error: Could not connect to File Search Store.")
        print(f"Details: {e}")
        return

    print(f"\nSuccessfully connected to store: {store.name}")
    print(f"Display Name: {getattr(store, 'display_name', 'No display name')}")
    print("\n--- Gemini Document Q&A ---")
    print("Type your question below (or 'exit' to quit, 'switch' to change store, 'summary' for document overview).\n")

    # 2. Interactive Loop
    current_store = store

    while True:
        try:
            user_input = input("Question: ").strip()

            if user_input.lower() in ('exit', 'quit', 'q'):
                print("Goodbye!")
                break

            if user_input.lower() == 'switch':
                # Allow switching to a different store
                print("\nSwitching stores...")
                stores = list_available_stores()

                if not stores:
                    print("No stores available to switch to.")
                    continue

                new_store = select_store(stores)
                if new_store:
                    try:
                        current_store = client.file_search_stores.get(name=new_store.name)
                        print(f"Switched to store: {getattr(current_store, 'display_name', 'No display name')}")
                    except Exception as e:
                        print(f"Error switching store: {e}")
                        # Keep current store if switch fails
                continue

            if user_input.lower() == 'summary':
                # Generate one-sentence summary of documents in store
                print("\nGenerating document summary...")
                print("This may take a moment as the AI analyzes all documents in the store...\n")

                try:
                    # Query for one-sentence summary
                    summary_prompt = """Based on all the documents in this File Search store, provide exactly one sentence that summarizes what these documents are about.
                    Your summary must be:
                    - Exactly one sentence
                    - Comprehensive yet concise
                    - Capture the main theme or topic
                    - Under 50 words if possible

                    Do not use multiple sentences. Do not list topics. Just give one single summary sentence."""

                    response = client.models.generate_content(
                        model="gemini-2.5-flash",
                        contents=summary_prompt,
                        config=types.GenerateContentConfig(
                            tools=[
                                types.Tool(
                                    file_search=types.FileSearch(
                                        file_search_store_names=[current_store.name]
                                    )
                                )
                            ]
                        )
                    )

                    print("\n--- Document Summary ---")
                    print(response.text.strip())
                    print("-" * 50)

                except Exception as e:
                    print(f"\nError generating summary: {e}")
                    print("This might be due to:")
                    print("- No documents found in the store")
                    print("- Store is still being processed")
                    print("- API rate limits")
                continue

            if not user_input:
                continue

            print("Thinking...")

            # 3. Generate Answer
            try:
                response = client.models.generate_content(
                    model="gemini-2.5-flash",
                    contents=user_input,
                    config=types.GenerateContentConfig(
                        tools=[
                            types.Tool(
                                file_search=types.FileSearch(
                                    file_search_store_names=[current_store.name]
                                )
                            )
                        ]
                    )
                )

                print("\nAnswer:")
                print(response.text)

                # Show grounding metadata if available
                if hasattr(response, 'candidates') and response.candidates:
                    candidate = response.candidates[0]
                    if hasattr(candidate, 'grounding_metadata') and candidate.grounding_metadata:
                        print("\n--- Sources ---")
                        grounding = candidate.grounding_metadata
                        if hasattr(grounding, 'search_entry_point') and grounding.search_entry_point:
                            print(f"Retrieved from: {current_store.display_name}")
                        if hasattr(grounding, 'retrieved_metadata') and grounding.retrieved_metadata:
                            print("Documents retrieved:")
                            for i, metadata in enumerate(grounding.retrieved_metadata, 1):
                                doc_name = getattr(metadata, 'display_name', f'Document {i}')
                                print(f"  {i}. {doc_name}")

                print("-" * 50)

            except Exception as e:
                print(f"\nError generating response: {e}")
                print("This might be due to:")
                print("- No relevant documents found in the store")
                print("- API rate limits")
                print("- Network connectivity issues")
                print("Please try again or switch to a different store.")

        except KeyboardInterrupt:
            print("\nGoodbye!")
            break
        except Exception as e:
            print(f"\nUnexpected error: {e}")
            print("Continuing... Type 'exit' to quit or 'switch' to change store.")

if __name__ == "__main__":
    main()
