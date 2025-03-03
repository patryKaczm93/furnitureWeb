import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login/Login';
import ProtectedPage from "./Protected/Protected";

function App() {

  return (
    <Router>
        <Routes>
        <Route path= '/' element={<Login />} />
        <Route path= '/protected' element={<ProtectedPage />} />
        </Routes>
    </Router>
  );
}


export default App;