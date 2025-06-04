from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.get("/weather")
def get_weather(city: str):
    print(f"Received request for city: {city}")
    api_key = os.getenv("OPENWEATHER_API_KEY") 
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    response = requests.get(url)
    return response.json()
