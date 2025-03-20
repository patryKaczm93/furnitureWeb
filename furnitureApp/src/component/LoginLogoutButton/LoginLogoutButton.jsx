import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LoginLogoutButton = () => {
    const { logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        if (isAuthenticated) {
            logout();
        } else {
            navigate("/login");
        }
    };

    return (
        <li>
            <button onClick={handleClick} className="nav-button">
                {isAuthenticated ? "Logout" : "Login"}
            </button>
        </li>
    );
};

export default LoginLogoutButton;