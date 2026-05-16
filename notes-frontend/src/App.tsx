import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<h1 className='text-3xl font-bold underline'>Home Page</h1>} />
        <Route path="/login" element={<h1 className='text-3xl font-bold underline'>Login Page</h1>} />
        <Route path="/signup" element={<h1 className='text-3xl font-bold underline'>Signup Page</h1>} />
      </Routes>
      <Routes>

      </Routes>
    </>
  )
}

export default App
