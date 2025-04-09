import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import LoginLogoutButton from "../LoginLogoutButton/LoginLogoutButton";
import "./Navbar.scss";

const Navbar = () => {
    const navigate = useNavigate();

    const handleMainPageClick = () => {
        navigate("/");
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