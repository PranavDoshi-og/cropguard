from services.weather import get_weather
from services.risk_logic import calculate_risk
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
import shutil
import os
from uuid import uuid4
from model.predictor import predict_disease
from dotenv import load_dotenv
from database import engine
from models import Base
from database import SessionLocal
from models import ImageRecord
from database import engine
from models import Base
import traceback

db=SessionLocal()

# Load .env file with explicit path
env_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path=env_path)

app = FastAPI()

Base.metadata.create_all(bind=engine)

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
    city: str = Form(...)
):
    try:
        filename = f"{uuid4()}_{file.filename}"
        file_path = os.path.join(UPLOAD_DIR, filename)

        with open(file_path, "wb") as f:
            f.write(await file.read())

        predicted_class, confidence = predict_disease(file_path)
        crop = predicted_class.split("_")[0]

        weather = get_weather(city)
        risk = calculate_risk(
            weather["temperature"],
            weather["humidity"],
            weather["rain"]
        )

        db = SessionLocal()
        record = ImageRecord(
            crop=crop,
            disease=predicted_class,
            confidence=float(confidence),
            risk_level=risk["level"],
            city=city,
            image_path=file_path
        )
        db.add(record)
        db.commit()
        db.close()

        return {
            "prediction": {
                "crop": crop,
                "disease": predicted_class,
                "confidence": confidence,
                "risk": risk
            },
            "city": city
        }
    except Exception as e:
        print(f"Error in predict endpoint: {str(e)}")
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))