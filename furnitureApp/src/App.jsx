import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  ProtectedPage,
  Register,
  AddProject,
  MyProjects,
  ManageUsers,
  ManageProjects,
  AddDoneImage,
  EditProfile,
} from "./pages";
import Navbar from "./component/Navbar/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { ProjectProvider } from "./context/ProjectContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ParallaxProvider } from "react-scroll-parallax"; 

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ProjectProvider>
          <ParallaxProvider> 
            <div>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/protected" element={<ProtectedPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/add-project" element={<AddProject />} />
                <Route path="/my-projects" element={<MyProjects />} />
                <Route path="/manage-users" element={<ManageUsers />} />
                <Route path="/manage-projects" element={<ManageProjects />} />
                <Route path="/add-done-image" element={<AddDoneImage />} />
                <Route path="/edit-profile" element={<EditProfile />} />
              </Routes>
            </div>
          </ParallaxProvider>
        </ProjectProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
