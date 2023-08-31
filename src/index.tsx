import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Fonts from './fonts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Fonts />
    <App />
  </React.StrictMode>
);
