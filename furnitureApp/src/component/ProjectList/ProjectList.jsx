import React from "react";
import "./ProjectList.scss";

const ProjectList = ({ projects, onEdit, onDelete }) => {
    return (
        <div className="projectsList">
            <h2>Lista projektów</h2>
            <ul>
                {projects.map((project) => (
                    <li key={project.id}>
                        <strong>{project.username}</strong> ({project.email})
                        <img src={`http://localhost:8000/${project.image_path}`} alt="Projekt" className="project-image" />
                        <p>Status: {project.order_status}</p>
                        <p>Opis: {project.description}</p>
                        <button onClick={() => onEdit(project)}>Edytuj</button>
                        <button onClick={() => onDelete(project.id)}>Usuń</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectList;
