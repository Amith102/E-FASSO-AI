import requests

def test_upload():
    try:
        # Create dummy file
        with open("test.jpg", "wb") as f:
            f.write(b'\xFF\xD8\xFF' + b'\x00' * 100)

        print("Uploading to tmpfiles.org...")
        with open("test.jpg", "rb") as f:
            response = requests.post("https://tmpfiles.org/api/v1/upload", files={"file": f})
        
        print(f"Status: {response.status_code}")
        print(f"Response: {response.text}")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_upload()
