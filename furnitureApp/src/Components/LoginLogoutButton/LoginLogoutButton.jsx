import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LoginLogoutButton = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleClick = () => {
        if (isAuthenticated) {
            logout(); // Wylogowanie użytkownika
        } else {
            navigate("/register"); // Przekierowanie do strony logowania
        }
    };

    return (
        <button onClick={handleClick}>
            {isAuthenticated ? "Logout" : "Login"} {/* Zmieniamy tekst przycisku */}
        </button>
    );
};

export default LoginLogoutButton;