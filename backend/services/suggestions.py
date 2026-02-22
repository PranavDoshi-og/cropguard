def get_suggestions(disease: str, risk_level: str):
    suggestions_map = {
        "Potato_Early_blight": [
            "Remove infected leaves",
            "Apply chlorothalonil fungicide",
            "Avoid overhead watering"
        ],
        "Potato_Late_blight": [
            "Destroy infected plants immediately",
            "Use systemic fungicides",
            "Improve field drainage"
        ],
        "Tomato_Early_blight": [
            "Remove lower infected leaves",
            "Apply copper-based fungicide",
            "Ensure proper spacing"
        ],
        "Tomato_Late_blight": [
            "Remove affected plants",
            "Apply protective fungicides",
            "Avoid wet foliage"
        ],
        "Potato_Healthy": [
            "Continue regular monitoring",
            "Maintain balanced fertilization"
        ],
        "Tomato_Healthy": [
            "Maintain crop hygiene",
            "Monitor weather changes"
        ]
    }

    base = suggestions_map.get(disease, ["Monitor crop regularly"])

    if risk_level == "High":
        base.append("Increase field inspections")
    elif risk_level == "Moderate":
        base.append("Monitor closely for symptoms")

    return base