// server/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

/* ---------------------------
   Mock data for quotes
   --------------------------- */
const quotes = [
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Don’t watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "The harder you work for something, the greater you’ll feel when you achieve it.", author: "Anonymous" }
];

/* ---------------------------
   Route: Health check
   --------------------------- */
app.get('/', (req, res) => {
  res.send('InfoHub backend is running');
});

/* ---------------------------
   Route: /api/quote
   Return: random quote (mock). Later can use external API
   --------------------------- */
app.get('/api/quote', (req, res) => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return res.json(quotes[randomIndex]);
});

/* ---------------------------
   Route: /api/currency
   Query: ?from=INR&to=USD&amount=100
   Uses exchangerate.host convert endpoint (no API key)
   --------------------------- */
app.get('/api/currency', async (req, res) => {
  const from = req.query.from || 'INR';
  const to = req.query.to || 'USD';
  const amount = req.query.amount || 1;

  try {
    const key = process.env.EXCHANGE_API_KEY;
    const url = `https://v6.exchangerate-api.com/v6/${key}/pair/${from}/${to}/${amount}`;
    const resp = await axios.get(url);

    if (resp.data.result === 'error') {
      throw new Error(resp.data['error-type'] || 'Currency API error');
    }

    res.json({
      from,
      to,
      amount,
      result: resp.data.conversion_result,
      rate: resp.data.conversion_rate,
    });
  } catch (err) {
    console.error('Currency error:', err.message);
    res.status(500).json({ error: 'Failed to fetch currency rates', details: err.message });
  }
});


/* ---------------------------
   Route: /api/weather
   Query: ?city=Hyderabad
   Requires: OPENWEATHER_KEY in .env
   --------------------------- */
console.log('OPENWEATHER_KEY length:', process.env.OPENWEATHER_KEY ? process.env.OPENWEATHER_KEY.length : 'NOT SET');

app.get('/api/weather', async (req, res) => {
  const city = req.query.city || 'Hyderabad';
  const key = process.env.OPENWEATHER_KEY;
  if (!key) {
    return res.status(500).json({ error: 'OpenWeatherMap API key not set in .env' });
  }
  try {
    const resp = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        appid: key,
        units: 'metric' // Celsius
      }
    });
    const d = resp.data;
    return res.json({
      city: d.name,
      temp: d.main.temp,
      feels_like: d.main.feels_like,
      description: d.weather[0].description,
      icon: d.weather[0].icon
    });
  } catch (err) {
    console.error('Weather error:', err.message);
    return res.status(500).json({ error: 'Failed to fetch weather' });
  }
});

/* ---------------------------
   Start server
   --------------------------- */
app.listen(PORT, () => {
  console.log(`✅ InfoHub backend listening at http://localhost:${PORT}`);
});
