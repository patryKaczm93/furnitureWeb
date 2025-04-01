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
                setUsername(user?.username);
                localStorage.setItem("username", user?.username);
            } else {
                setUsername('Login');
                localStorage.removeItem("username");  
            }
        }
    }, [isAuthenticated, user, isLoading]);


    return (
        <div className="profile-menu" tabIndex="0" onBlur={() => setIsOpen(false)} ref={dropdownRef}>
            <button onClick={handleToggle} className="profile-button">
                {username}
            </button>
    
            {isAuthenticated && (
                <div className={`dropdown-container ${isOpen ? "show" : ""}`}>
                    <ul className="dropdown-menu">
                        {user?.role === "admin" ? (
                            <>
                                <li><a href="/add-done-image">Dodaj zdjęcie realizacji</a></li>
                                <li><a href="/manage-users">Zarządzanie użytkownikami</a></li>
                                <li><a href="/manage-projects">Zarządzanie projektami</a></li>
                            </>
                        ) : (
                            <>
                                <li><a href="/add-project">Dodaj projekt</a></li>
                                <li><a href="/my-projects">Moje projekty</a></li>
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
