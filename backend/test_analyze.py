import requests

url = "http://127.0.0.1:8000/analyze"
image_path = "C:/Users/amith/.gemini/antigravity/brain/b1af51d0-0d40-4f00-baf0-2d4f32c6e83f/uploaded_image_1768608740417.png"

try:
    with open(image_path, 'rb') as f:
        files = {'front_image': f}
        print(f"Sending request to {url}...")
        response = requests.post(url, files=files)
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            print("Response JSON keys:", response.json().keys())
            # print("Full Response:", response.json()) # Too verbose
        else:
            print("Error Response:", response.text)
except Exception as e:
    print(f"Test failed: {e}")
