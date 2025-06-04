import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/weather?city=${city}`);
      setWeather(response.data);
    } catch (error) {
      setWeather({ error: "City not found or backend issue." });
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <img 
        src="https://img.icons8.com/ios-filled/100/000000/partly-cloudy-day.png"
        alt="weather icon"
        style={{ width: "60px", marginBottom: "1rem" }}
      />
      <h1>Weather App</h1>
      <input 
        type="text"
        placeholder="Enter a city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Get Weather</button>

      <div style={{ marginTop: '2rem' }}>
        {/* {weather && (
          <pre>{JSON.stringify(weather, null, 2)}</pre>
        )} */}
        {weather && !weather.error && (
  <div style={{
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "1rem",
    marginTop: "2rem",
    width: "300px",
    textAlign: "center",
    backgroundColor: "#f9f9f9"
  }}>
    <h2>{weather.name}, {weather.sys.country}</h2>
    <img 
      src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
      alt={weather.weather[0].description}
    />
    <p style={{ fontSize: "1.5rem", margin: "0.5rem 0" }}>
      {weather.weather[0].description}
    </p>
    <p><strong>Temp:</strong> {weather.main.temp}°C</p>
    <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
    <p><strong>Wind:</strong> {weather.wind.speed} m/s</p>
  </div>
)}

      </div>
    </div>
  );
}

export default App;
