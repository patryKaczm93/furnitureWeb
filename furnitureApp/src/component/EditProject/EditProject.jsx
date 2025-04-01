import React, { useState } from "react";
import "./EditProject.scss";

const EditProject = ({ project }) => {
    const [orderStatus, setOrderStatus] = useState(project.order_status);
    const [description, setDescription] = useState(project.description); 
    const [isUpdated, setIsUpdated] = useState(false);

    const handleStatusChange = (e) => {
        setOrderStatus(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = () => {
        fetch(`http://localhost:8000/update_image/${project.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                description: description, 
                order_status: orderStatus   
            }),
        })
            .then((res) => res.json())
            .then(() => setIsUpdated(true))
            .catch((err) => console.error("Błąd aktualizacji statusu:", err));
    };

    return (
        <div className="editProject">
            <h2>Edycja Projektu</h2>
            <p><strong>Opis:</strong> {project.description}</p>
            <textarea
                value={description} 
                onChange={handleDescriptionChange} 
                placeholder="Edytuj opis..."
            />
            <p><strong>Status:</strong> {project.order_status}</p>
            <label>
                Nowy Status:
                <select value={orderStatus} onChange={handleStatusChange}>
                    <option value="new">Nowe</option>
                    <option value="accepted">Zaakceptowane</option>
                    <option value="in_progress">W trakcie</option>
                    <option value="completed">Zakończone</option>
                    <option value="rejected">Odrzucone</option>
                </select>
            </label>
            <button onClick={handleSubmit}>Zaktualizuj status</button>
            {isUpdated && <p>Status został zaktualizowany!</p>}
        </div>
    );
};

export default EditProject;
