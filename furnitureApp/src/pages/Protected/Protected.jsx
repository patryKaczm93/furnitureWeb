import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProtectedPage() {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth(); 

    useEffect(() => {
        const verifyToken = async () => {
            const token = user?.token;
            console.log("Token:", token);
            if (!token) {
                navigate("/"); 
                return;
            }

            try {
                const response = await fetch("http://localhost:8000/verified-token/", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                });

                if (!response.ok) {
                    throw new Error('Token verification failed');
                }
            } catch (error) {
                console.error(error);
                localStorage.removeItem("token");
                navigate("/login"); 
            }
        };

        if (isAuthenticated) {
            verifyToken();
        } else {
            navigate("/login"); 
        }
    }, [navigate, isAuthenticated, user?.token]);

    return (
        <div>
            <h2>Protected Page</h2>
            <p>Welcome, you are logged in and authorized to see this page.</p>
        </div>
    );
}

export default ProtectedPage;
