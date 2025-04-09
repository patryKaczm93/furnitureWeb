import React, { useState, useEffect } from "react";
import { Element } from "react-scroll";
import { motion, useAnimation } from "framer-motion";
import ImageCarousel from "@component/ImageCarousel/ImageCarousel";
import "./Home.scss";

const Home = () => {
    const [activeSection, setActiveSection] = useState("home");
    const controls = useAnimation();

    const sectionColors = {
        home: "#EADDC7",    // Jasny beż
        about: "#D4B996",   // Ciepły piaskowy
        services: "#A67B5B", // Jasny brąz
        contact: "#8B5E3B",  // Ciemny orzech
    };

    useEffect(() => {
        controls.start({ backgroundColor: sectionColors[activeSection], transition: { duration: 1 } });
    }, [activeSection, controls]);

    return (
        <motion.div className="home-container" animate={controls}>
            <Element name="home" className="section" onMouseEnter={() => setActiveSection("home")}>
                <h2>Strona Główna</h2>
                <p>Witamy na naszej stronie!</p>
            </Element>

            <Element name="about" className="section" onMouseEnter={() => setActiveSection("about")}>
                <h2>O firmie</h2>
                <p>Opis firmy...</p>
                <ImageCarousel />
            </Element>

            <Element name="services" className="section" onMouseEnter={() => setActiveSection("services")}>
                <h2>Usługi</h2>
                <p>Nasze usługi...</p>
            </Element>

            <Element name="contact" className="section" onMouseEnter={() => setActiveSection("contact")}>
                <h2>Kontakt</h2>
                <p>Formularz kontaktowy...</p>
            </Element>
        </motion.div>
    );
};

export default Home;
