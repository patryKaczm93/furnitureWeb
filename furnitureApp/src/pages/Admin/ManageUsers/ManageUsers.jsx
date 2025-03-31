import React, { useState } from "react";
import EditUser from "@components/EditUser/EditUser";
import UserList from "@components/UserList/UserList";
import "./ManageUsers.scss";  


const ManageUsers = () => {
    const [selectedUser, setSelectedUser] = useState(null);

    const handleEdit = (user) => {
        setSelectedUser(user);
    };

    const handleDelete = async (userId) => {
        if (window.confirm("Czy na pewno chcesz usunąć użytkownika?")) {
            try {
                await fetch(`http://localhost:8000/user/${userId}`, { method: "DELETE" });
                alert("Użytkownik usunięty!");
            } catch (error) {
                console.error("Błąd podczas usuwania użytkownika:", error);
            }
        }
    };

    return (
        <div className="manageUsers">
            <h1>Zarządzanie użytkownikami</h1>
            {selectedUser ? (
                <EditUser user={selectedUser} onSave={() => setSelectedUser(null)} />
            ) : (
                <UserList onEdit={handleEdit} onDelete={handleDelete} />
            )}
        </div>
    );
};

export default ManageUsers;