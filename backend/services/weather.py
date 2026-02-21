import requests
import os
API_KEY = os.getenv("OPENWEATHER_API_KEY")

def get_weather(city: str):
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    
    try:
        response = requests.get(url)
        data = response.json()
    except Exception:
        return{
            "temperature": None,
            "humidity": None,
            "rain":0,
            "error":"Weather service unavailable"
        }

    if data.get("cod") != 200:
        return {"error": "Weather data not found"}

    return {
        "temperature": data["main"]["temp"],
        "humidity": data["main"]["humidity"],
        "description": data["weather"][0]["description"],
        "wind_speed": data["wind"]["speed"],
        "rain": data.get("rain", {}).get("1h", 0)
    }