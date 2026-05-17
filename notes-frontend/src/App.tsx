import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import SignUpPage from './components/auth/SignUp'
import LoginPage from './components/auth/Login'

function App() {

  return (
    <>
    <Navbar/>
      <Routes>
        <Route
          path="/"
          element={<h1 className='text-3xl font-bold underline'>Home Page</h1>}
        />

        <Route
          path="/signup"
          element={<SignUpPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />
      </Routes>
    </>
  )
}

export default App