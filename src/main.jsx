import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import PersonalSection from './NewPersonal'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <h1 class="text-7xl font-bold underline text-gray-900">resume app!</h1>
    <PersonalSection ></PersonalSection>
  </StrictMode>,
)
