import mediapipe as mp
import cv2
import math

mp_pose = mp.solutions.pose
pose = mp_pose.Pose(static_image_mode=True, min_detection_confidence=0.5, model_complexity=2)

def calculate_distance(p1, p2):
    return math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2)

def estimate_measurements(image, height_cms=170.0):
    """
    Estimates body measurements based on MediaPipe Pose landmarks.
    """
    results = pose.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
    
    if not results.pose_landmarks:
        return {
            "error": "No body detected",
            "measurements": {}
        }

    landmarks = results.pose_landmarks.landmark

    # Key Landmarks
    left_shoulder = landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER]
    right_shoulder = landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER]
    left_hip = landmarks[mp_pose.PoseLandmark.LEFT_HIP]
    right_hip = landmarks[mp_pose.PoseLandmark.RIGHT_HIP]
    left_heel = landmarks[mp_pose.PoseLandmark.LEFT_HEEL]
    right_heel = landmarks[mp_pose.PoseLandmark.RIGHT_HEEL]
    nose = landmarks[mp_pose.PoseLandmark.NOSE] # Approx top of head proxy for now
    
    # Calculate Pixel Distances
    shoulder_dist_px = calculate_distance(left_shoulder, right_shoulder)
    hip_dist_px = calculate_distance(left_hip, right_hip)
    
    # Estimate Height in Pixels (Nose to mid-point of heels)
    mid_heel_x = (left_heel.x + right_heel.x) / 2
    mid_heel_y = (left_heel.y + right_heel.y) / 2
    height_px = math.sqrt((nose.x - mid_heel_x)**2 + (nose.y - mid_heel_y)**2)
    
    # Scale Factor (cm per pixel unit) - Heuristic adjustment (1.1x for head above nose)
    # Note: Validating strictly requires full body standing straight
    if height_px == 0: height_px = 1 # Avoid div by zero
    
    scale_factor = height_cms / (height_px * 1.1) 
    
    measurements = {
        "shoulder_width": round(shoulder_dist_px * scale_factor, 1),
        "chest": round(shoulder_dist_px * scale_factor * 2.2, 1), # Heuristic
        "waist": round(hip_dist_px * scale_factor * 1.8, 1), # Heuristic
        "hip": round(hip_dist_px * scale_factor * 2.0, 1), # Heuristic (Front width * 2 roughly)
    }
    
    return {
        "status": "success",
        "measurements": measurements
    }
