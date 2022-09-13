import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import { Hello3Provider } from '@hello3/react'
import App from './App'

import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Hello3Provider
      config={{
        domain: 'example.hello3.io',
        connectorSocketEndpoint: 'wss://connector.hello3.io',
        connectorPostEndpoint: 'https://connector.hello3.io',
        callbackEndpoint: 'https://example.hello3.io',
      }}
    >
      <App />
    </Hello3Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
