
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';

// Bootstrap CSS — importar aquí afecta toda la app
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles/custom.css';

// ReactDOM.createRoot() selecciona el <div id="root"> del index.html
// y "monta" toda la aplicación React dentro de él
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* HashRouter usa URLs con # (ej: /#/mascotas) — perfectamente compatible con GitHub Pages */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);