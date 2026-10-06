import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initFaro } from './observability/faro'

// Initialize Grafana Faro before rendering.
// Application works normally if VITE_GRAFANA_FARO_URL is not configured.
initFaro()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
