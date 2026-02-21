import requests

API_KEY = "42bcbf1de423d555f9b59433d146fd35"

def get_weather(city: str):
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    
    response = requests.get(url)
    data = response.json()

    if data.get("cod") != 200:
        return {"error": "Weather data not found"}

    return {
        "temperature": data["main"]["temp"],
        "humidity": data["main"]["humidity"],
        "description": data["weather"][0]["description"],
        "wind_speed": data["wind"]["speed"],
        "rain": data.get("rain", {}).get("1h", 0)
    }