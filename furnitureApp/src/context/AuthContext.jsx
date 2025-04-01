import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
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
            const userData = response.data;
            setUser({ ...userData, token });
            localStorage.setItem("userId", userData.id);
        } catch (error) {
            console.error("Błąd pobierania danych użytkownika:", error);
            logout();
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (token) => {
        await fetchUser(token);
        localStorage.setItem("token", token);
        navigate("/");
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
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
