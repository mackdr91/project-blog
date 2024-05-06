import react from 'react'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Detail from './pages/Detail'
import "./styles/index.css"
import Navbar from './components/Navbar';


function App() {

  return (
    <BrowserRouter>
    <Navbar />
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/api/posts/:id" element={<Detail />} />
         
           
         
       
      



       

    </Routes>
    
    </BrowserRouter>
  )
}

export default App
