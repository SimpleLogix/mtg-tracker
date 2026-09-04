import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Capacitor, SystemBars } from '@capacitor/core'
import './styles/index.css'
import App from './App.tsx'

const init = async () => {
  if (Capacitor.isNativePlatform()) {
    await SystemBars.hide() // hides both status bar and nav bar by default
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

init()