import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SeedsProvider from './context/SeedsContext.tsx'

import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SeedsProvider>
      <App />
    </SeedsProvider>
  </StrictMode>,
)
