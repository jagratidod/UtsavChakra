import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/dancing-script/700.css'; // Import the font
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
