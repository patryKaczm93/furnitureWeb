import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);  // Stan ładowania danych użytkownika
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchUser(token);
        } else {
            setIsLoading(false);
        }
    }, []);

    const fetchUser = async (token) => {
        try {
            const response = await axios.get("http://localhost:8000/verified-token", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser({ ...response.data, token });
        } catch (error) {
            console.error("Błąd pobierania danych użytkownika:", error);
            logout();
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (token) => {
        localStorage.setItem("token", token);
        localStorage.setItem("username", user[0]?.username);
        await fetchUser(token);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setIsLoading(false);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
