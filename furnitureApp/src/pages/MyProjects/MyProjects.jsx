import { useEffect, useState } from "react";
import "./MyProjects.scss"; 

const MyProjects = () => {
    const userId = localStorage.getItem("userId");
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`http://localhost:8000/projects?user_id=${userId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error("Błąd pobierania projektów:", error);
            }
        };

        if (userId) {
            fetchProjects();
        }
    }, [userId]);

    return (
        <div className="my-projects-container">
            <h2>Moje Projekty</h2>
            {projects.length > 0 ? (
                <div className="project-list">
                    {projects.map((project) => (
                        <div key={project.id} className="project-item">
                            <img 
                                src={`http://localhost:8000/${project.image_path}`} 
                                alt="Projekt" 
                                className="project-image"
                            />
                            <p>{project.description}</p>
                            <p>Status: {project.order_status}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Brak projektów do wyświetlenia.</p>
            )}
        </div>
    );
}

export default MyProjects;