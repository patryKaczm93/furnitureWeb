import React from "react";
import { Link as ScrollLink } from "react-scroll";
import { useNavigate, useLocation } from "react-router-dom";
import LoginLogoutButton from "../LoginLogoutButton/LoginLogoutButton";
import "./Navbar.scss";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();  

    const handleMainPageClick = () => {
        if (location.pathname === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" }); 
        } else {
            navigate("/", { replace: true });
        }
    };

    return (
        <nav className="navbar">
            <button className="nav-button" onClick={handleMainPageClick}>
                Main Page
            </button>
            <ul>
                <li><ScrollLink to="about" smooth={true} duration={500}>O firmie</ScrollLink></li>
                <li><ScrollLink to="services" smooth={true} duration={500}>Usługi</ScrollLink></li>
                <li><ScrollLink to="contact" smooth={true} duration={500}>Kontakt</ScrollLink></li>
                <LoginLogoutButton />
            </ul>
        </nav>
    );
};

export default Navbar;
