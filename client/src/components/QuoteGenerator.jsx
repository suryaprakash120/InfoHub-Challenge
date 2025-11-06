import React, { useState } from 'react';
import axios from 'axios';

export default function QuoteGenerator() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchQuote() {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:3001/api/quote');
      setQuote(res.data);
    } catch (err) {
      console.error(err);
      setQuote({ text: 'Failed to load quote', author: '' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="module">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Motivational Quote</h2>
        <button onClick={fetchQuote}>Get Quote</button>
      </div>

      <div className="card">
        {loading ? <div>Loading...</div> :
          quote ? (
            <blockquote>
              <p style={{ fontSize: 18 }}>{quote.text}</p>
              <footer style={{ marginTop: 8, color: '#555' }}>— {quote.author}</footer>
            </blockquote>
          ) : <div>Click "Get Quote" to fetch a quote.</div>}
      </div>
    </div>
  );
}
