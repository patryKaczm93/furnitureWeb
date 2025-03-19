import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Login, ProtectedPage, Register } from "./pages";
import Navbar from "./Components/Navbar/Navbar";
import { AuthProvider } from "./context/AuthContext";  // Importujemy AuthProvider

function App() {
  return (
    <AuthProvider>  {/* Owijamy całą aplikację w AuthProvider */}
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/protected" element={<ProtectedPage />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
