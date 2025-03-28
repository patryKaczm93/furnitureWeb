import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Login, ProtectedPage, Register, AddProject, MyProjects} from "./pages";
import Navbar from "./component/Navbar/Navbar";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/protected" element={<ProtectedPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-project" element={<AddProject />} />
          <Route path="/my-projects" element={<MyProjects />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;