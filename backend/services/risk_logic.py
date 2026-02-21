def calculate_risk(temp, humidity, rain):
    if humidity > 75 and 10 <= temp <= 25 and rain > 0:
        return "High Risk (Blight Conditions)"
    elif temp > 35:
        return "High Risk (Heat Stress)"
    elif humidity > 70:
        return "Moderate Risk"
    else:
        return "Low Risk"