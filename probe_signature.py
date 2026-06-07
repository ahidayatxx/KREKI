from google import genai
import inspect

client = genai.Client()
print("Signature of client.file_search_stores.documents.list:")
try:
    sig = inspect.signature(client.file_search_stores.documents.list)
    print(sig)
except Exception as e:
    print(f"Error getting signature: {e}")
