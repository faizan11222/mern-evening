import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbarr from "./components/Navbar"
import Homepage from "./pages/Homepage"
import AddStudentPage from "./pages/AddStudentPage"

function App() {
  
  return (
    <BrowserRouter>
    <Navbarr />
    <Routes>
    <Route path="/" element={<Homepage />} />
    <Route path="/add" element={<AddStudentPage />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
