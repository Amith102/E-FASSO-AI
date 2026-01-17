import requests

API_KEY = "L1CYCK1PJ5UVRWJKCX7DBPW7LKMAUT"
URL = "https://thenewblack.ai/api/1.1/wf/vto_stream"

def test_connection():
    try:
        post_url = f"{URL}?api_key={API_KEY}"
        
        # Create valid-ish dummy binary files
        dummy_bytes = b'\xFF\xD8\xFF' + b'\x00' * 100 # JPEG header signature
        with open("test_model.jpg", "wb") as f:
            f.write(dummy_bytes)
        with open("test_garment.jpg", "wb") as f:
            f.write(dummy_bytes)

        files = {
            'model_photo': ('model.jpg', open('test_model.jpg', 'rb'), 'image/jpeg'),
            'clothing_photo': ('garment.jpg', open('test_garment.jpg', 'rb'), 'image/jpeg')
        }
        
        data = {
            "clothing_type": "tops",
            "ratio": "3:4",
            "prompt": "realistic photo of a person wearing a shirt"
        }
        
        print(f"Testing POST MULTIPART to {post_url}...")
        response = requests.post(post_url, files=files, data=data)
        
        print(f"Status: {response.status_code}")
        print(f"Response: {response.text}")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_connection()
