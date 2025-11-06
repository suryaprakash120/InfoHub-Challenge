import React, { useState } from 'react';
import WeatherModule from './components/WeatherModule';
import CurrencyConverter from './components/CurrencyConverter';
import QuoteGenerator from './components/QuoteGenerator';

export default function App() {
  const [tab, setTab] = useState('weather');

  return (
    <div className="app-container" style={{ maxWidth: 760, margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>InfoHub</h1>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 20 }}>
        <button onClick={() => setTab('weather')}>Weather</button>
        <button onClick={() => setTab('currency')}>Currency</button>
        <button onClick={() => setTab('quote')}>Quote</button>
      </div>

      <div style={{ border: '1px solid #ddd', padding: 20, borderRadius: 8 }}>
        {tab === 'weather' && <WeatherModule />}
        {tab === 'currency' && <CurrencyConverter />}
        {tab === 'quote' && <QuoteGenerator />}
      </div>
    </div>
  );
}
