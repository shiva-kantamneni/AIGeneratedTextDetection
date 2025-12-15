import React from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SignUp from "./SignUp";
import Login from "./Login";
import HomePage from "./Home";
const App=()=>{
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/Signup" element={<SignUp/>}/>
        <Route path="/Home" element={<HomePage/>}/>
      </Routes>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  )
  
}

export default App;