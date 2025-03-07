import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Get root element
const container = document.getElementById('root');

// Ensure container exists
if (!container) {
  throw new Error('Failed to find root element');
}

// Create and render root
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);