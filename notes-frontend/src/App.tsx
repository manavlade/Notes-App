import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import SignUpPage from './components/auth/SignUp'
import LoginPage from './components/auth/Login'
import Notespage from './components/notes/NotesPage'
import HomePage from './components/shared/home'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<HomePage/>}
        />

        <Route
          path="/signup"
          element={<SignUpPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/create-note"
          element={<Notespage />}
        />
      </Routes>
    </>
  )
}

export default App