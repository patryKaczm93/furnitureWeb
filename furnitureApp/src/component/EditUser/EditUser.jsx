import React, { useState } from "react";
import "./EditUser.scss";

const EditUser = ({ user, onSave }) => {
    const [formData, setFormData] = useState({
        username: user.username,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/user/${user.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                onSave();
            }
        } catch (error) {
            console.error("Błąd aktualizacji użytkownika:", error);
        }
    };

    return (
        <div className="editUser"> 
            <h2>Edytuj użytkownika</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Nazwa użytkownika"
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="E-mail"
                />
                <button type="submit">Zapisz</button>
            </form>
        </div>
    );
};

export default EditUser;
