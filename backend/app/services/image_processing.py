import cv2
import numpy as np
from rembg import remove
from PIL import Image
import io

async def process_image(image_bytes: bytes) -> np.ndarray:
    """
    Decodes bytes to OpenCV image and removes background.
    """
    # 1. Remove background using rembg
    input_image = Image.open(io.BytesIO(image_bytes))
    output_image = remove(input_image)
    
    # 2. Convert PIL to OpenCV (RGB to BGR)
    img_np = np.array(output_image)
    if img_np.shape[2] == 4: # Handle Alpha channel
        # Create white background
        trans_mask = img_np[:,:,3] == 0
        img_np[trans_mask] = [255, 255, 255, 255]
        img_np = cv2.cvtColor(img_np, cv2.COLOR_RGBA2BGR)
    else:
        img_np = cv2.cvtColor(img_np, cv2.COLOR_RGB2BGR)
        
    return img_np

def resize_with_aspect_ratio(image, width=None, height=None, inter=cv2.INTER_AREA):
    dim = None
    (h, w) = image.shape[:2]

    if width is None and height is None:
        return image
    if width is None:
        r = height / float(h)
        dim = (int(w * r), height)
    else:
        r = width / float(w)
        dim = (width, int(h * r))

    return cv2.resize(image, dim, interpolation=inter)
