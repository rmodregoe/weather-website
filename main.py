from fastapi import FastAPI
import requests
from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv()

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.get("/weather")
def get_weather(city: str):
    api_key = os.getenv("OPENWEATHER_API_KEY") 
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    response = requests.get(url)
    return response.json()
