from sklearn.cluster import KMeans
import cv2
import numpy as np
import webcolors

def analyze_skin_tone(img: np.ndarray):
    """
    Analyzes the skin tone of the image using K-Means clustering.
    Assumes img is BGR.
    """
    # 1. Crop Center (Heuristic for face/body) - simplified for prototype
    h, w, _ = img.shape
    center_y, center_x = h // 2, w // 2
    crop_h, crop_w = h // 4, w // 4
    # Crop the center region where skin is likely
    crop_img = img[center_y-crop_h:center_y+crop_h, center_x-crop_w:center_x+crop_w]
    
    if crop_img.size == 0:
        crop_img = img

    # 2. Convert to RGB and Flatten
    img_rgb = cv2.cvtColor(crop_img, cv2.COLOR_BGR2RGB)
    pixels = img_rgb.reshape(-1, 3)

    # 3. K-Means Clustering (k=3 to find dominant skin color vs clothes)
    kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
    kmeans.fit(pixels)
    
    # 4. Find most dominant color
    colors = kmeans.cluster_centers_.astype(int)
    labels, counts = np.unique(kmeans.labels_, return_counts=True)
    dominant_color = colors[labels[np.argmax(counts)]]
    
    # 5. Determine Tone (Simple Heuristic based on R/G/B values)
    # R > G > B usually for skin
    r, g, b = dominant_color
    
    tone_label = "Neutral"
    if r > g and r > b:
        if b < g * 0.8: # Less blue = Warm
            tone_label = "Warm"
        else:
            tone_label = "Cool"
    
    # 6. Recommend Colors
    recommendations = {
        "Warm": ["#FFD700", "#FF4500", "#8B4513", "#556B2F"], # Gold, Orange, Brown, Olive
        "Cool": ["#0000FF", "#800080", "#C0C0C0", "#008080"], # Blue, Purple, Silver, Teal
        "Neutral": ["#FFC0CB", "#000000", "#FFFFFF", "#808080"] # Pink, Black, White, Gray
    }

    return {
        "tone_label": tone_label,
        "dominant_color_rgb": dominant_color.tolist(),
        "recommended_colors": recommendations.get(tone_label, [])
    }
