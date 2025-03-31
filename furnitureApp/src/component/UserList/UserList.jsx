import React, { useEffect, useState } from "react";
import "./UserList.scss";  

const UserList = ({ onEdit, onDelete }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/all-users")
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.error("Błąd pobierania użytkowników:", err));
    }, []);

    return (
        <div className="userList"> 
            <h2>Lista użytkowników</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.username} - {user.email}
                        <button onClick={() => onEdit(user)}>Edytuj</button>
                        <button onClick={() => onDelete(user.id)}>Usuń</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
