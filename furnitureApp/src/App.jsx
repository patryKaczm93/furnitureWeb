import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Login, ProtectedPage, Register } from "./pages"
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <div>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/protected" element={<ProtectedPage />} />
          <Route path="/register" element={<Register />} />
        </Routes>
    </div>
  );
}

export default App;