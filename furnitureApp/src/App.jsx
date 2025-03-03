import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login/Login';
import ProtectedPage from "./Protected/Protected";
import Register from "./Register/Register";

function App() {

  return (
    <Router>
        <Routes>
        <Route path= '/' element={<Login />} />
        <Route path= '/protected' element={<ProtectedPage />} />
        <Route path= '/register' element={<Register />} />
        </Routes>
    </Router>
  );
}


export default App;