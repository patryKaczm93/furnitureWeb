import React, { useState, useEffect } from "react";
import { Element } from "react-scroll";
import { motion, useAnimation } from "framer-motion";
import ImageCarousel from "@component/ImageCarousel/ImageCarousel";
import "./Home.scss";

const Home = () => {
    const [activeSection, setActiveSection] = useState("home");
    const controls = useAnimation();

    const sectionColors = {
        home: "#EADDC7", 
        about: "#D4B996",   
        services: "#A67B5B", 
        contact: "#8B5E3B",  
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
                <motion.div
                    initial={{ x: -200, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    >
                <p>Opis firmy...</p>
                </motion.div>
                <ImageCarousel />
            </Element>

            <Element name="services" className="section" onMouseEnter={() => setActiveSection("services")}>
                <h2>Usługi</h2>
                <p>Nasze usługi...</p>
            </Element>

            <Element name="contact" className="section" onMouseEnter={() => setActiveSection("contact")}>
                <motion.div
                    className="contact-form-wrapper"
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <form className="contact-form">
                        <h2>Kontakt</h2>
                        <label>
                            Imię:
                            <input type="text" name="name" placeholder="Twoje imię" />
                        </label>
                        <label>
                            Email:
                            <input type="email" name="email" placeholder="Twój email" />
                        </label>
                        <label>
                            Wiadomość:
                            <textarea name="message" placeholder="Napisz wiadomość..." />
                        </label>
                        <button type="submit">Wyślij</button>
                    </form>
                </motion.div>
            </Element>
                <footer className="footer">
                        <div className="footer-content">
                            <div className="footer-section about">
                                <h3>Nasza Firma</h3>
                                <p>Specjalizujemy się w projektowaniu i produkcji mebli na wymiar, łącząc estetykę z funkcjonalnością.</p>
                            </div>

                            <div className="footer-section links">
                                <h3>Linki</h3>
                                <ul>
                                    <li><a href="#home">Strona Główna</a></li>
                                    <li><a href="#about">O nas</a></li>
                                    <li><a href="#services">Usługi</a></li>
                                    <li><a href="#contact">Kontakt</a></li>
                                </ul>
                            </div>

                            <div className="footer-section contact">
                                <h3>Kontakt</h3>
                                <p>ul. Przykładowa 12, 00-001 Warszawa</p>
                                <p>Tel: +48 123 456 789</p>
                                <p>Email: kontakt@meblefirma.pl</p>
                            </div>
                        </div>

                        <div className="footer-bottom">
                            <p>&copy; {new Date().getFullYear()} MebleFirma. Wszelkie prawa zastrzeżone.</p>
                        </div>
                </footer>
        </motion.div>
    );
};

export default Home;
