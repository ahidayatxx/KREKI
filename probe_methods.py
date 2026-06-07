from google import genai
import inspect

client = genai.Client()
print("Methods on client.file_search_stores:")
for name, method in inspect.getmembers(client.file_search_stores):
    if not name.startswith('_'):
        print(name)
