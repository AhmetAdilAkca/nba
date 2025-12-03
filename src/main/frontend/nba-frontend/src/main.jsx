// This file is the entry point of the React application, mounting the root component to the DOM.
// It wraps the App component with StrictMode for development checks.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
