import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/app'
import '@/app/styles/index.css'
import WithProviders from '@/app/providers'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <WithProviders>
    <App />
  </WithProviders>,
)
