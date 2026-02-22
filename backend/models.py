from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime 
from database import Base   

class ImageRecord(Base):
    __tablename__ = "image_records"

    id= Column(Integer, primary_key=True, index=True)
    crop= Column(String)
    disease= Column(String)
    confidence= Column(Float)
    risk_level= Column(String)
    city=Column(String)
    image_path= Column(String)
    created_at= Column(DateTime, default=datetime.utcnow)

