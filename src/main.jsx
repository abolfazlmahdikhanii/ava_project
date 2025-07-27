<<<<<<< HEAD
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
<<<<<<< HEAD
<<<<<<< HEAD

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
=======
=======
>>>>>>> 0604e09 (Add solution for challenge 3)
import { BrowserRouter as Routes } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <Routes>
    <App />
  </Routes>,
<<<<<<< HEAD
>>>>>>> c51ed5d (Add solution for challenge 2)
=======
>>>>>>> 0604e09 (Add solution for challenge 3)
)
=======
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Routes>
      <App />
    </Routes>
  </Provider>
);
>>>>>>> 574ed32 (Add solution for challenge 4)
