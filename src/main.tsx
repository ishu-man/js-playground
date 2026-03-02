import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="center flex-col">
      <h1 className='text-4xl mt-12 font-extrabold'>Pokemon Memory Game!</h1>
      <p className='text-xl italic max-w-124 text-center mt-3'>a simple memory game based on pokemon cards that definitely didn't take me too long to make!</p>
    </div>
    <App />
  </StrictMode>
)
