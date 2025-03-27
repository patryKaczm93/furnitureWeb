import React from "react";
import { Element } from "react-scroll";
import "./Home.scss";

const Home = () => {
    return (
        <div className="home-container">
            <Element name="home" className="section">
                <h2>Strona Główna</h2>
                <p>Witamy na naszej stronie!</p>
            </Element>

            <Element name="about" className="section">
                <h2>O firmie</h2>
                <p>Opis firmy...</p>
            </Element>

            <Element name="services" className="section">
                <h2>Usługi</h2>
                <p>Nasze usługi...</p>
            </Element>

            <Element name="contact" className="section">
                <h2>Kontakt</h2>
                <p>Formularz kontaktowy...</p>
            </Element>
        </div>
    );
};

export default Home;
