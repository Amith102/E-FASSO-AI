from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .services import image_processing, skin_tone, body_measurement
import shutil

app = FastAPI(title="Fashion AI API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Fashion AI Backend is Running"}

@app.post("/analyze")
async def analyze_image(
    front_image: UploadFile = File(...), 
    height_cm: str | None = Form(None)
):
    try:
        # Parse height if provided
        height_val = float(height_cm) if height_cm else None
        # 1. Read Image
        image_bytes = await front_image.read()
        
        # 2. Process Image (Remove BG)
        processed_img = await image_processing.process_image(image_bytes)
        
        # 3. Analyze Skin Tone (Use processed image or original?)
        # Better to use original for color, processed for body. 
        # For prototype, we use processed but handle transparency
        skin_analysis = skin_tone.analyze_skin_tone(processed_img)
        
        # 4. Estimate Measurements
        measurements = body_measurement.estimate_measurements(processed_img, height_val)
        
        return {
            "status": "success",
            "skin_analysis": skin_analysis,
            "body_analysis": measurements
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
