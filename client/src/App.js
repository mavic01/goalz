import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Register from "./pages/Register.js"
import Dashboard from "./pages/Dashboard.js"
import Login from "./pages/Login.js"
import Header from "./components/Header.jsx"

function App() {
  return (
    <>
    
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>

      <ToastContainer />
    </>
  ); 
}

export default App
