import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

const mountApp = () => {
  const rootEl = document.getElementById('root');
  if (!rootEl) return;
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}
