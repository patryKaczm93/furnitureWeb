import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LoginLogoutButton = () => {
    const { user, logout, isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [username, setUsername] = useState(localStorage.getItem("username") || 'Login');

    const handleToggle = (e) => {
        e.preventDefault();
        if (isAuthenticated) {
            setIsOpen((prev) => !prev);
        } else {
            navigate("/login")
        }
    };

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        setIsOpen(false);
    };

    useEffect(() => {
        if (!isLoading) {
            if (isAuthenticated && user) {
                setUsername(user[0]?.username || 'Profil');
                localStorage.setItem("username", user[0]?.username || 'Profil');
            } else {
                setUsername('Login');
                localStorage.removeItem("username");  
            }
        }
    }, [isAuthenticated, user, isLoading]);

    
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);


    return (
        <div className="profile-menu">
            <button onClick={handleToggle} className="profile-button">
                {username}
            </button>

            {isAuthenticated && (
                <div className={`dropdown-container ${isOpen ? "show" : ""}`}>
                    <ul className="dropdown-menu">
                        {user[0]?.role === "admin" ? (
                            <>
                                <li><a href="/admin-settings">Admin Settings</a></li>
                                <li><a href="/manage-users">Zarządzanie użytkownikami</a></li>
                            </>
                        ) : (
                            <>
                                <li><a href="/add-project">Dodaj projekt</a></li>
                                <li><a href="/edit-profile">Edytuj profil</a></li>
                            </>
                        )}
                        <li><button onClick={handleLogout} className="logout-button">Wyloguj</button></li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default LoginLogoutButton;
