from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import pandas as pd
import joblib
from pathlib import Path

app = FastAPI()

# Allow the Vite dev server (port 8443) and any localhost origin to call the API.
# In production, replace "*" with your actual frontend domain.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8443",
        "http://localhost:5173",
        "http://127.0.0.1:8443",
        "http://127.0.0.1:5173",
    ],
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

# Build absolute paths relative to this file (backend/app/main.py).
# This works regardless of which directory you run uvicorn from.
_MODELS_DIR = Path(__file__).resolve().parent.parent / "models"

model = joblib.load(_MODELS_DIR / "house_model.joblib")
features = joblib.load(_MODELS_DIR / "house_features.joblib")

class House_Features(BaseModel):
    MedInc: float = Field(ge=0)
    HouseAge: float = Field(ge=0)
    AveRooms: float = Field(ge=0)
    AveBedrms: float = Field(ge=0)
    Population: float = Field(ge=0)
    AveOccup: float = Field(ge=0)
    Latitude: float = Field(ge=32, le=42)
    Longitude: float = Field(ge=-125, le=-114)

@app.get('/')
@app.get('/home')
def home():
    return {
        'message': 'House Price Prediction Model',
        'status': 'active',
        'endpoint': 'send POST request to /estimate api endpoint'
    }

@app.post('/estimate')
def estimate(house: House_Features):
    try:
        input_data = pd.DataFrame([{
            "MedInc": house.MedInc,
            "HouseAge": house.HouseAge,
            "AveRooms": house.AveRooms,
            "AveBedrms": house.AveBedrms,
            "Population": house.Population,
            "AveOccup": house.AveOccup,
            "Latitude": house.Latitude,
            "Longitude": house.Longitude
        }])

        predicted = model.predict(input_data)[0]
        price_usd = predicted * 100000

        return {
            "predicted_price": round(price_usd, 2),
            "range_low":  round(price_usd - 32773, 2),
            "range_high": round(price_usd + 32773, 2),
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f'Prediction failed: {str(e)}'
        )