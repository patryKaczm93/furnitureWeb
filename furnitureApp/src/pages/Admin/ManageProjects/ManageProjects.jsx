import React, { useContext, useState } from "react";
import { ProjectContext } from "../../../context/ProjectContext";
import ProjectList from "@component/ProjectList/ProjectList";
import EditProject from "@component/EditProject/EditProject";
import "./ManageProjects.scss";

const ManageProjects = () => {
    const { projects, setProjects } = useContext(ProjectContext);
    const [selectedProject, setSelectedProject] = useState(null);

    const handleEdit = (project) => {
        setSelectedProject(project);
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:8000/delete_image/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then(() => {
                setProjects(projects.filter((project) => project.id !== id));
            })
            .catch((err) => console.error("Błąd usuwania projektu:", err));
    };

    return (
        <div className="manageProjects">
            <h1>Zarządzanie Projektami</h1>
            <ProjectList projects={projects} onEdit={handleEdit} onDelete={handleDelete} />
            
            {selectedProject && (
                <EditProject project={selectedProject} />
            )}
        </div>
    );
};

export default ManageProjects;