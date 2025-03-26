import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LoginLogoutButton = () => {
    const { logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = (e) => {
        e.preventDefault();
        if (isAuthenticated) {
            setIsOpen((prev) => !prev);
        } else {
            navigate("/login");
        }
    };

    const handleLogout = (e) => {
        e.preventDefault(); // ❗ Dodane, aby zapobiec przeładowaniu strony
        logout();
        setIsOpen(false);
    };

    return (
        <div className="profile-menu">
            <button onClick={handleToggle} className="profile-button">
                {isAuthenticated ? "Profil" : "Login"}
            </button>

            {isAuthenticated && (
                <div className={`dropdown-container ${isOpen ? "show" : ""}`}>
                    <ul className="dropdown-menu">
                        <li><a href="/add-project">Dodaj projekt</a></li>
                        <li><a href="/edit-profile">Edytuj profil</a></li>
                        <li><a href="/edit-profile">Test</a></li>
                        <li><button onClick={handleLogout} className="logout-button">Wyloguj</button></li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default LoginLogoutButton;
