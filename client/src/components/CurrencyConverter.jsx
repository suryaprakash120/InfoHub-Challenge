import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../App';

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(100);
  const [from, setFrom] = useState('INR');
  const [to, setTo] = useState('USD');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function convert() {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/api/currency`, {
        params: { from, to, amount }
      });
      setResult(res.data.result);
    } catch (err) {
      console.error(err);
      setResult('Error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="module">
      <h2>Currency Converter</h2>
      <div className="card">
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
          <select value={from} onChange={e => setFrom(e.target.value)}>
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
          <span>→</span>
          <select value={to} onChange={e => setTo(e.target.value)}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="INR">INR</option>
          </select>
          <button onClick={convert}>Convert</button>
        </div>

        <div style={{ marginTop: 12 }}>
          {loading ? 'Converting...' :
            result !== null ? <div><strong>Result:</strong> {result}</div> : <div>Enter values and click Convert</div>}
        </div>
      </div>
    </div>
  );
}
