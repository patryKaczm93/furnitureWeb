import React, { useState } from "react"; 
import { Element } from "react-scroll"; 
import { Parallax } from 'react-scroll-parallax';  
import { motion } from "framer-motion"; 
import ImageCarousel from "@component/ImageCarousel/ImageCarousel"; 
import "./Home.scss";

import aboutImage from '../../assets/99b307c2-74fe-442d-a8bb-f1979f8f1f65.png';
import servicesImage from '../../assets/cd6e90e8-a401-4cf3-b21c-25f4ce9c47c0.png';
import contactImage from '../../assets/ChatGPT Image 9 kwi 2025, 21_56_26.png';
import homeImage from "../../assets/42ae1333-136c-4a9d-ad21-7dce5554a139.png";

const Home = () => {
    const [activeSection, setActiveSection] = useState("home");

    return (
        <div className="home-container">
            <Element
                name="home"
                className="section"
                style={{ backgroundImage: `url(${homeImage})`, backgroundSize: 'cover' }}
                onMouseEnter={() => setActiveSection("home")}
            >
                <div className="section-content">
                    <Parallax y={[-30, 30]} tagOuter="figure">
                        <h2>Strona Główna</h2>
                        <p>Witamy na naszej stronie!</p>
                    </Parallax>
                </div>
            </Element>

            <Element
                name="about"
                className="section"
                style={{ backgroundImage: `url(${aboutImage})`, backgroundSize: 'cover' }}
                onMouseEnter={() => setActiveSection("about")}
            >
                <div className="section-content">
                    <h2>O firmie</h2>
                    <Parallax y={[-20, 20]} tagOuter="figure">
                        <motion.div
                            initial={{ x: -200, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <p>
                                Jesteśmy rodzinną firmą specjalizującą się w tworzeniu mebli na zamówienie...
                            </p>
                        </motion.div>
                    </Parallax>
                    <ImageCarousel />
                </div>
            </Element>

            <Element
                name="services"
                className="section"
                style={{ backgroundImage: `url(${servicesImage})`, backgroundSize: 'cover' }}
                onMouseEnter={() => setActiveSection("services")}
            >
                <div className="section-content">
                    <h2>Usługi</h2>
                    <Parallax y={[-25, 25]} tagOuter="figure">
                        <motion.p
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            Oferujemy kompleksową obsługę: od pomiaru i projektu 3D...
                        </motion.p>
                    </Parallax>
                </div>
            </Element>

            <Element
                name="contact"
                className="section"
                style={{ backgroundImage: `url(${contactImage})`, backgroundSize: 'cover' }}
                onMouseEnter={() => setActiveSection("contact")}
            >
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
                        <p>Specjalizujemy się w projektowaniu i produkcji mebli na wymiar...</p>
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
        </div>
    );
};

export default Home;
