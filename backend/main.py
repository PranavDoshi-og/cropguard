from services.weather import get_weather
from services.risk_logic import calculate_risk
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File, Form
import shutil
import os
from model.predictor import predict_disease
from dotenv import load_dotenv

# Load .env file with explicit path
env_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path=env_path)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/health")
def health_check():
    return {"status": "Okay"}

@app.post("/predict")
async def predict(
    file: UploadFile = File(...),
    city: str = Form(...),
):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as f:
        f.write(await file.read())

    predicted_class, confidence = predict_disease(file_path,"tomato")

    weather = get_weather(city)
    if weather.get("temperature") is None:
        risk = {"level": "Unknown", "reason": "weather data unavailable"}
    else:
        risk = calculate_risk(
            temp=weather["temperature"],
            humidity=weather["humidity"],
            rain=weather["rain"],
        )

    prediction = {
        "disease": predicted_class,
        "confidence": confidence,
    }

    return {
        "prediction": prediction,
        "weather": weather,
        "risk": risk,
    }