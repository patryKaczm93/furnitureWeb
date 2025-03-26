import React from "react";
import { Link } from "react-router-dom";
import LoginLogoutButton from "../LoginLogoutButton/LoginLogoutButton";
import "./Navbar.scss";

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/">Main Page</Link>
            <ul>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <LoginLogoutButton />
            </ul>
        </nav>
    );
};

export default Navbar;