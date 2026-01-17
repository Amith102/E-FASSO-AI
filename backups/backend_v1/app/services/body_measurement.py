import mediapipe as mp
import cv2
import math

mp_pose = mp.solutions.pose
pose = mp_pose.Pose(static_image_mode=True, min_detection_confidence=0.5, model_complexity=2)

def calculate_distance(p1, p2):
    return math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2)

def estimate_measurements(image, height_cms=None):
    """
    Estimates body measurements based on MediaPipe Pose landmarks.
    If height_cms is None, estimates it based on biometric ratios.
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
    nose = landmarks[mp_pose.PoseLandmark.NOSE] 
    
    # Calculate Pixel Distances
    shoulder_dist_px = calculate_distance(left_shoulder, right_shoulder)
    hip_dist_px = calculate_distance(left_hip, right_hip)
    
    # Estimate Height in Pixels (Nose to mid-point of heels)
    mid_heel_x = (left_heel.x + right_heel.x) / 2
    mid_heel_y = (left_heel.y + right_heel.y) / 2
    height_px = math.sqrt((nose.x - mid_heel_x)**2 + (nose.y - mid_heel_y)**2) * 1.1 # 1.1 correction for head top
    
    if height_px == 0 or shoulder_dist_px == 0: 
        return { "error": "Body processing failed", "measurements": {} }

    # --- Auto-Height Logic ---
    if not height_cms:
        # 1. Gender Guess (Hip Ratio)
        # Women typically have wider hips relative to shoulders than men
        ratio = hip_dist_px / shoulder_dist_px
        
        if ratio > 0.85: # Heuristic threshold for Female
            ref_shoulder_width_cm = 36.0 # Avg Female Shoulder
        else:
            ref_shoulder_width_cm = 41.0 # Avg Male Shoulder
            
        # 2. Calculate Scale from Shoulder
        scale_factor = ref_shoulder_width_cm / shoulder_dist_px
        
        # 3. Estimate Height
        height_cms = round(height_px * scale_factor, 1)
        is_estimated = True
    else:
        scale_factor = float(height_cms) / height_px
        is_estimated = False
    
    measurements = {
        "shoulder_width": round(shoulder_dist_px * scale_factor, 1),
        "chest": round(shoulder_dist_px * scale_factor * 2.2, 1), 
        "waist": round(hip_dist_px * scale_factor * 1.8, 1), 
        "hip": round(hip_dist_px * scale_factor * 2.1, 1),
        "estimated_height_cm": height_cms
    }
    
    return {
        "status": "success",
        "measurements": measurements,
        "is_height_estimated": is_estimated,
        "landmarks": {
            "left_shoulder": {"x": left_shoulder.x, "y": left_shoulder.y},
            "right_shoulder": {"x": right_shoulder.x, "y": right_shoulder.y},
            "left_hip": {"x": left_hip.x, "y": left_hip.y},
            "right_hip": {"x": right_hip.x, "y": right_hip.y}
        }
    }
