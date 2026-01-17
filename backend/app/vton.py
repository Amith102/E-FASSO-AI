import cv2
import numpy as np
import base64
import os
import shutil
import cv2
import numpy as np
import base64
import os
import shutil
from pathlib import Path
from rembg import remove
from PIL import Image
import io
from gradio_client import Client, file

# Initialize Client for IDM-VTON (State-of-the-art Open Source VTON)
# We use the public space. In production, this should be a private deployment.
# Global client variable (lazy loaded)
# Kept for reference but primarily using REST API now
client = None

API_KEY = "L1CYCK1PJ5UVRWJKCX7DBPW7LKMAUT"
API_URL = "https://thenewblack.ai/api/1.1/wf/vto_stream"

import requests

def upload_to_tmpfiles(file_path: str) -> str:
    """Uploads file to tmpfiles.org and returns the DIRECT download URL."""
    try:
        url = "https://tmpfiles.org/api/v1/upload"
        print(f"Uploading {file_path} to tmpfiles...", flush=True)
        with open(file_path, "rb") as f:
            response = requests.post(url, files={"file": f}, timeout=30)
        
        if response.status_code == 200:
            data = response.json()
            view_url = data["data"]["url"] 
            direct_url = view_url.replace("tmpfiles.org/", "tmpfiles.org/dl/")
            print(f"Uploaded: {direct_url}", flush=True)
            return direct_url
        else:
            print(f"Tmpfiles upload failed: {response.text}", flush=True)
            return None
    except Exception as e:
        print(f"Tmpfiles error: {e}", flush=True)
        return None

def save_upload_file_tmp(upload_file: UploadFile) -> str:
    try:
        suffix = Path(upload_file.filename).suffix
        with NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            shutil.copyfileobj(upload_file.file, tmp)
            tmp_path = tmp.name
        return tmp_path
    finally:
        upload_file.file.close()

async def generate_tryon(person_img: UploadFile, garment_img: UploadFile, caption: str = "clothing"):
    person_path = save_upload_file_tmp(person_img)
    garment_path = save_upload_file_tmp(garment_img)
    
    try:
        # 1. Upload Loop (Local -> Public Cloud)
        print("Uploading images to public host for API access...", flush=True)
        person_url = upload_to_tmpfiles(person_path)
        garment_url = upload_to_tmpfiles(garment_path)
        
        if not person_url or not garment_url:
            raise Exception("Failed to host images publicly")
            
        # 2. Call TheNewBlack.ai API
        print(f"Calling TheNewBlack API with: {person_url}, {garment_url}", flush=True)
        
        payload = {
            "model_photo": person_url,
            "clothing_photo": garment_url,
            "clothing_type": "tops", 
            "ratio": "3:4",
            "prompt": caption or "realistic photo"
        }
        
        # 60s timeout for generation
        response = requests.post(f"{API_URL}?api_key={API_KEY}", json=payload, timeout=60)
        
        if response.status_code == 200:
            # API returns generic JSON but likely contains the image URL or Base64
            # Usually these Bubble APIs return json with "response": "url" or similar.
            # Assuming it returns the image content directly based on "stream" name?
            # Let's check Content-Type.
            
            content_type = response.headers.get("Content-Type", "")
            if "image" in content_type:
                # Direct image bytes
                encoded_string = base64.b64encode(response.content).decode('utf-8')
                return {"image": f"data:{content_type};base64,{encoded_string}"}
            else:
                # JSON response with URL
                resp_json = response.json()
                # Try to find a URL in common fields
                # "response", "data", "url", "output"
                result_url = None
                if isinstance(resp_json, dict):
                    # Bubble often returns { "response": { "url": ... } } or just { "response": "url" }
                    if "response" in resp_json:
                         res = resp_json["response"]
                         if isinstance(res, dict) and "url" in res: result_url = res["url"]
                         elif isinstance(res, str) and res.startswith("http"): result_url = res
                
                if result_url:
                     return {"image": result_url} # Frontend can handle URL
                
                print(f"API Response Structure Unknown: {resp_json}")
                raise Exception("API returned success but no recognizable image URL")
                
        else:
            print(f"TheNewBlack API Error {response.status_code}: {response.text}")
            raise Exception(f"API Error: {response.text}")

    except Exception as e:
        print(f"TheNewBlack VTON failed ({e}). Falling back to OpenCV.")
        # FALLBACK continues below...
        pass

    # --- FALLBACK: OpenCV Smart Composite ---
    try:
        # Load Images
        p_img = cv2.imread(person_path)
        # Load garment with PIL for easier rembg processing
        g_pil = Image.open(garment_path).convert("RGBA")
        
        # REMOVE BACKGROUND using rembg
        g_pil = remove(g_pil)
        
        # Convert back to OpenCV format (numpy array)
        g_img = np.array(g_pil)
        # Convert RGB to BGR (PIL is RGB, OpenCV is BGR)
        g_img = cv2.cvtColor(g_img, cv2.COLOR_RGBA2BGRA)

        if p_img is None or g_img is None:
             raise Exception("Failed to load images for fallback")

        # Basic processing for fallback (Center overlay)
        p_h, p_w = p_img.shape[:2]
        
        # Resize garment to 65% of person width (slightly larger for better fit)
        target_w = int(p_w * 0.65)
        if target_w < 1: target_w = 1 # safety
        
        scale = target_w / g_img.shape[1]
        target_h = int(g_img.shape[0] * scale)
        if target_h < 1: target_h = 1 # safety
        
        g_resized = cv2.resize(g_img, (target_w, target_h))

        # Position at 18% from top (approx chest/neck line)
        y_offset = int(p_h * 0.18)
        x_offset = int((p_w - target_w) / 2)

        # Alpha Blending Logic
        # (No thresholding needed since rembg gives us a clean alpha channel)
        
        y1, y2 = y_offset, y_offset + target_h
        x1, x2 = x_offset, x_offset + target_w
        
        if y2 > p_h: y2 = p_h
        if x2 > p_w: x2 = p_w
        
        g_h = y2 - y1
        g_w = x2 - x1
        
        if g_h > 0 and g_w > 0:
            alpha_s = g_resized[:g_h, :g_w, 3] / 255.0
            alpha_l = 1.0 - alpha_s
            
            for i in range(3):
                p_img[y1:y2, x1:x2, i] = (alpha_s * g_resized[:g_h, :g_w, i] + 
                                        alpha_l * p_img[y1:y2, x1:x2, i])

        # Encode return
        _, buffer = cv2.imencode('.png', p_img)
        encoded_string = base64.b64encode(buffer).decode('utf-8')
        return {"image": f"data:image/png;base64,{encoded_string}", "fallback": True}
        
    except Exception as e:
        print(f"Fallback VTON also failed: {e}")
        raise HTTPException(status_code=500, detail="All VTON methods failed.")
        
    finally:
        # Cleanup
        if os.path.exists(person_path): os.remove(person_path)
        if os.path.exists(garment_path): os.remove(garment_path)
