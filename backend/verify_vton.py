from gradio_client import Client
import time

print("Testing connection to yisol/IDM-VTON...")
try:
    start = time.time()
    client = Client("Nymbo/Virtual-Try-On")
    print(f"Success! Client connected in {time.time() - start:.2f}s")
    print("API Info:")
    client.view_api()
except Exception as e:
    print(f"FAILED to connect: {e}")
