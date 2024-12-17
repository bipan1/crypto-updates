"use client";

import React, { useState, useEffect } from 'react';

const Portfolio = () => {
  const [cryptoData, setCryptoData] = useState({});
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('WebSocket connection established.');
      setConnectionStatus('Connected');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Received data from WebSocket:', data);
        setCryptoData(data);
      } catch (err) {
        console.error('Error parsing WebSocket message:', err);
        setError('Error processing data from the WebSocket server.');
      }
    };

    ws.onerror = (err) => {
      console.error('WebSocket error:', err);
      setError('WebSocket encountered an error.');
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed.');
      setConnectionStatus('Disconnected');
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Cryptocurrency Portfolio</h1>
      <p>Status: <strong>{connectionStatus}</strong></p>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!error && Object.keys(cryptoData).length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ddd' }}>
              <th style={{ padding: '8px', textAlign: 'left' }}>Cryptocurrency</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Price (USD)</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(cryptoData).map(([coin, details]) => (
              <tr key={coin} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '8px' }}>{coin.toUpperCase()}</td>
                {/* @ts-ignore */}
                <td style={{ padding: '8px' }}>${details?.usd?.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default Portfolio;
