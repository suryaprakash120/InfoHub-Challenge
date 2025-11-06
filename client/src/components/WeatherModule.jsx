import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../App';

export default function WeatherModule() {
  const [city, setCity] = useState('Hyderabad');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchWeather() {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/api/weather`, { params: { city }});
      setWeather(res.data);
    } catch (err) {
      console.error(err);
      setWeather({ error: 'Failed to get weather' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="module">
      <h2>Weather</h2>
      <div className="card">
        <div style={{ display: 'flex', gap: 8 }}>
          <input value={city} onChange={e => setCity(e.target.value)} />
          <button onClick={fetchWeather}>Get Weather</button>
        </div>

        <div style={{ marginTop: 12 }}>
          {loading ? 'Loading weather...' : weather ? (
            weather.error ? <div>{weather.error}</div> : (
              <div>
                <h3>{weather.city}</h3>
                <div>{weather.temp} °C — {weather.description}</div>
                <div>Feels like: {weather.feels_like} °C</div>
                <div>
                  <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="icon" />
                </div>
              </div>
            )
          ) : <div>Enter city and click Get Weather</div>}
        </div>
      </div>
    </div>
  );
}
