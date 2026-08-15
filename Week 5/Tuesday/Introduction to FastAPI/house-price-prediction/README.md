# 🏠 PriceIQ — California Home Price Estimator

A full-stack web application that predicts California home prices using a machine learning model trained on the **California Housing Dataset**. Users enter key property features and instantly receive a price estimate with a confidence range.

---

## 📸 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite 8, Tailwind CSS v4, TypeScript |
| **Backend** | FastAPI, Uvicorn, Python 3.12+ |
| **ML** | scikit-learn, joblib, pandas, numpy |
| **Package Managers** | pnpm (frontend), uv (backend) |

---

## 📁 Project Structure

```
house-price-prediction/
├── backend/
│   ├── app/
│   │   └── main.py          # FastAPI app — routes & prediction logic
│   ├── models/              # Trained model files (not committed to git)
│   │   ├── house_model.joblib
│   │   └── house_features.joblib
│   └── pyproject.toml       # Python dependencies (managed with uv)
├── frontend/
│   ├── src/
│   │   ├── components/      # React components (HomePage, PredictPage, etc.)
│   │   ├── App.jsx          # Root component & routing
│   │   ├── index.css        # Global styles & Tailwind v4 import
│   │   └── main.tsx         # React entry point
│   ├── index.html
│   ├── vite.config.ts       # Vite config with API proxy to backend
│   └── package.json
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

- **Python** ≥ 3.12
- **Node.js** ≥ 20 and **pnpm**
- **uv** — Python package manager (`pip install uv`)
- Trained model files placed in `backend/models/` (see [Training the Model](#training-the-model))

---

### 1. Backend Setup

```bash
cd backend

# Create virtual environment and install dependencies
uv sync

# Start the FastAPI server (runs on port 8000)
uv run uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`.  
Interactive docs: `http://localhost:8000/docs`

---

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
pnpm install

# Start the Vite dev server (runs on port 5173)
pnpm dev
```

Open `http://localhost:5173` in your browser. The Vite dev server proxies `/estimate` and `/home` requests to the FastAPI backend automatically.

---

## 🧠 API Reference

### `GET /` or `GET /home`
Returns a status message confirming the API is running.

### `POST /estimate`
Returns a predicted home price based on the input features.

**Request body:**
```json
{
  "MedInc":    5.0,
  "HouseAge":  20.0,
  "AveRooms":  6.0,
  "AveBedrms": 1.0,
  "Population":300.0,
  "AveOccup":  3.0,
  "Latitude":  34.0,
  "Longitude": -118.0
}
```

**Response:**
```json
{
  "predicted_price": 285000.00,
  "range_low":       252227.00,
  "range_high":      317773.00
}
```

| Field | Description |
|---|---|
| `MedInc` | Median block-group income (in $10,000s) |
| `HouseAge` | Median age of houses in the block (years) |
| `AveRooms` | Average number of rooms per household |
| `AveBedrms` | Average number of bedrooms per household |
| `Population` | Block-group population |
| `AveOccup` | Average household occupancy |
| `Latitude` | Latitude (32°N – 42°N for California) |
| `Longitude` | Longitude (–125°W – –114°W for California) |

---

## 🔧 Training the Model

The model is not committed to the repository. Train it yourself and place the output files in `backend/models/`:

```python
from sklearn.datasets import fetch_california_housing
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import train_test_split
import joblib, pandas as pd
from pathlib import Path

data = fetch_california_housing(as_frame=True)
X, y = data.data, data.target

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = GradientBoostingRegressor(n_estimators=200, random_state=42)
model.fit(X_train, y_train)

output_dir = Path("backend/models")
output_dir.mkdir(exist_ok=True)

joblib.dump(model, output_dir / "house_model.joblib")
joblib.dump(list(X.columns), output_dir / "house_features.joblib")

print("Model saved!")
```

---

## 🌐 CORS

During development, CORS is configured to allow requests from:
- `http://localhost:5173` (Vite default)
- `http://localhost:8443` (alternative port)

For production, update `allow_origins` in `backend/app/main.py` to your actual frontend domain.

---

## 📄 License

This project is for educational purposes as part of the **Introduction to FastAPI** coursework.
