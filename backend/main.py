from services.weather import get_weather
from services.risk_logic import calculate_risk
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File, Form
import shutil
import os
from model.predictor import predict_disease

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
def predict(
    crop: str = Form(...),
    image: UploadFile = File(...)
):
    file_path = os.path.join(UPLOAD_DIR, image.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    result = predict_disease(file_path, crop)

    weather = get_weather(city)

    risk = calculate_risk(
        weather["temperature"],
        weather["humidity"],
        weather["rain"]
    )
    return {
        "disease": predicted_class,
        "confidence": confidence,
        "weather": weather,
        "risk_level": risk
    }