import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import PersonalSection from './components/Personal'
import EmploymentSection from './components/Employment'
import EducationSection from './components/Education'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <h1 class="text-7xl font-bold text-gray-900 text-center mt-5 mb-5 ">Résumé Form</h1>
    {/* could do something like sylvan for the bg */}
    <div class='flex justify-center items-center'>
      <p className='text-2xl w-xl text-center mb-5'>This was intended to be a practice mini task for learning about <span><em>useState</em> and <em>props</em></span> in React along with some Tailwind styling. From the Odin project.</p>
    </div>
    <PersonalSection></PersonalSection>
    <hr className='ml-10 mt-10 mb-10 border-2 border-gray-700 w-450'></hr>
    {/* why can't you style JSX elements like: <PersonalSection className="bg-amber-500"></PersonalSection> */}
    <EducationSection></EducationSection>
    <hr className='ml-10 mt-10 mb-10 border-2 border-gray-700 w-450'></hr>
    <EmploymentSection></EmploymentSection>
  </StrictMode>,
)
