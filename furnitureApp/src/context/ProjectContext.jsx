import React, { createContext, useState, useEffect } from "react";

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/all_projects")
            .then((res) => res.json())
            .then((data) => setProjects(data))
            .catch((err) => console.error("Błąd pobierania projektów:", err));
    }, []);

    return (
        <ProjectContext.Provider value={{ projects, setProjects }}>
            {children}
        </ProjectContext.Provider>
    );
};