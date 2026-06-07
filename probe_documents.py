from google import genai
import inspect

client = genai.Client()
print("Methods on client.file_search_stores.documents:")
try:
    for name, method in inspect.getmembers(client.file_search_stores.documents):
        if not name.startswith('_'):
            print(name)
except Exception as e:
    print(f"Error: {e}")
