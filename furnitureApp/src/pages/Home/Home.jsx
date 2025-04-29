import { Element } from "react-scroll";
import { Parallax } from 'react-scroll-parallax';  
import { motion } from "framer-motion"; 
import CountUp from 'react-countup';
import ImageCarousel from "@component/ImageCarousel/ImageCarousel"; 
import "./Home.scss";
import { Link } from 'react-scroll';

import aboutImage from '../../assets/99b307c2-74fe-442d-a8bb-f1979f8f1f65.png';
import servicesImage from '../../assets/cd6e90e8-a401-4cf3-b21c-25f4ce9c47c0.png';
import contactImage from '../../assets/ChatGPT Image 9 kwi 2025, 21_56_26.png';
import homeImage from "../../assets/42ae1333-136c-4a9d-ad21-7dce5554a139.png";
import servicesImage2 from "../../assets/c1f1ec52-6122-4947-9c93-12057a7ac924.png";

const Home = () => {

    return (
        <div className="home-container">
            <Element
                name="home"
                className="section"
                style={{ backgroundImage: `url(${homeImage})`, backgroundSize: 'cover' }}
            >
                <motion.div
                    className="section-content"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    onViewportBoxUpdate={(info, delta) => {
                        if (info.isInView) {
                            setActiveSection("home");
                        }
                    }}
                >
                    <div className="company-title">
                        <h1>Nasza Firma</h1>
                    </div>

                    <div className="company-info">
                        <p>
                            Nasza firma oferuje usługi najwyższej jakości. Działamy na rynku od wielu lat i zrealizowaliśmy setki projektów. Zapraszamy do kontaktu!
                        </p>
                        <Link 
                            to="contact" 
                            smooth={true}  
                            duration={500}  
                            className="contact-button"
                        >
                            Skontaktuj się z nami
                        </Link>
                    </div>
                </motion.div>
            </Element>

            <Element
            name="about"
            className="section"
            style={{ backgroundImage: `url(${aboutImage})`, backgroundSize: 'cover' }}
        >
            <motion.div
                className="section-content custom-services"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                onViewportBoxUpdate={(info, delta) => {
                    if (info.isInView) {
                        setActiveSection("about");
                    }
                }}
            >
                <h3>O firmie</h3>

                <motion.div
                    className="about-row"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 1 }}
                    viewport={{ once: true }}
                >
                    <motion.div className="carousel-wrapper">
                        <ImageCarousel />
                    </motion.div>
                </motion.div>

                <motion.div
                    className="bottom-section"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    viewport={{ once: true }}
                >
                    <img src={aboutImage} alt="Realizacja" className="bottom-image" />
                    <div className="stats">
                        <motion.div
                            className="stat-item"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.5, duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h3><CountUp end={200} duration={2} /></h3>
                            <p>Zadowolonych klientów</p>
                        </motion.div>

                        <div className="divider" />

                        <motion.div
                            className="stat-item"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.8, duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h3><CountUp end={150} duration={2} /></h3>
                            <p>Wykonanych projektów</p>
                        </motion.div>

                        <div className="divider" />

                        <motion.div
                            className="stat-item"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2.1, duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h3><CountUp end={30} duration={1} /></h3>
                            <p>Lat doświadczenia</p>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </Element>



        <Element
            name="services"
            className="section"
            style={{ backgroundImage: `url(${servicesImage})`, backgroundSize: 'cover' }}
        >
            <motion.div 
                className="section-content horizontal-layout"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                onViewportBoxUpdate={(info, delta) => {
                    if (info.isInView) {
                        setActiveSection("services");
                    }
                }}
            >
                <div className="service-left">
                    <div className="image-frame">
                        <img src={servicesImage2} alt="Usługi" />
                    </div>
                </div>

                <div className="service-right">
                    <motion.h2
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        Nasze Usługi
                    </motion.h2>

                    <Parallax y={[-25, 25]}>
                        <motion.p
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            viewport={{ once: true }}
                        >
                            Oferujemy kompleksową obsługę: od pomiaru i projektu 3D, przez realizację mebli, aż po ich montaż.
                        </motion.p>
                    </Parallax>

                    <div className="services-list">
                        <motion.ul
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1.2 }}
                        >
                            <motion.li
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 1.4 }}
                            >
                                - Projektowanie wnętrz
                            </motion.li>
                            <motion.li
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 1.7 }}
                            >
                                - Realizacja mebli na wymiar
                            </motion.li>
                            <motion.li
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 2.0 }}
                            >
                                - Montaż i instalacja
                            </motion.li>
                        </motion.ul>
                    </div>
                </div>
            </motion.div>
        </Element>




        <Element
            name="contact"
            className="section"
            style={{ backgroundImage: `url(${contactImage})`, backgroundSize: 'cover' }}
        >
            <motion.div
                className="section-content" 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false }}
                onViewportBoxUpdate={(info, delta) => {
                    if (info.isInView) {
                        setActiveSection("contact");
                    }
                }}
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
