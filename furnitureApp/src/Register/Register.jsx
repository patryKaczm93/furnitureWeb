import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.scss";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const validateForm = () => {
        if (!username || !password) {
            setError("Username and password are required");
            return false;
        }
        setError("");
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;
        setLoading(true);

        try {
            const response = await fetch("http://localhost:8000/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }), 

            });

            setLoading(false);

            if (response.ok) {
                setError("Zarejestrowano!")
            } else {
                const errorData = await response.json();
                setError(errorData.detail || "Registration failed");
            }
        } catch (error) {
            setLoading(false);
            setError("An error occurred");
        }
    };


    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                {error && <div className="error">{error}</div>}
                <button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Register"}
                </button>
                <button onClick={() => navigate("/")}>Login Page
                </button>
            </form>
        </div>
    );
}

export default Register;