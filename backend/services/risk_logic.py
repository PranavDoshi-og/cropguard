def calculate_risk(temp, humidity, rain):
    if humidity > 75 and 10 <= temp <= 25 and rain > 0:
        return {"level": "High", "reason": "Blight-favorable conditions"}
    elif temp > 35:
        return {"level": "High", "reason": "Heat stress"}
    elif humidity > 70:
        return {"level": "Moderate", "reason": "High humidity"}
    else:
        return {"level": "Low", "reason": "Normal conditions"}