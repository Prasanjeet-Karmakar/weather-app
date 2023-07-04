import React from 'react';
import ReactDOM from 'react-dom/client';
import Snowfall from 'react-snowfall';

import App from './App';
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <Snowfall />
    <App />
  </div>
  
);

