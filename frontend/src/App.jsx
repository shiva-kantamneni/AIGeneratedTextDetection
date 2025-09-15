import React from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css";

import SignUp from "./SignUp";
import Login from "./Login";
const App=()=>{
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/Signup" element={<SignUp/>}/>
      </Routes>
    </Router>
  )
  
}

export default App;