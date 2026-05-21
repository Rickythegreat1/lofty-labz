import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './styles/index.css';

const loader = document.getElementById('branded-loader');
if (loader) {
  loader.style.transition = 'opacity 0.4s ease-out';
  loader.style.opacity = '0';
  window.setTimeout(() => loader.remove(), 400);
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element #root not found in index.html');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
