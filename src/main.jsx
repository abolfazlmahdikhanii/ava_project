import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
<<<<<<< HEAD

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
=======
import { BrowserRouter as Routes } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <Routes>
    <App />
  </Routes>,
>>>>>>> c51ed5d (Add solution for challenge 2)
)
