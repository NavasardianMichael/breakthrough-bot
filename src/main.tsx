import React from 'react'
import ReactDOM from 'react-dom/client'
import 'styles/commons.css'
import 'styles/variables.css'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('app-root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
