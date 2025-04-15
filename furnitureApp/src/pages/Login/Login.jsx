import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.scss";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
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
            const response = await fetch("http://localhost:8000/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            setLoading(false);

            if (response.ok) {
                const data = await response.json();
                login(data.access_token);
                navigate("/protected");
            } else {
                const errorData = await response.json();
                setError(errorData.detail || "Login failed");
            }
        } catch (error) {
            setLoading(false);
            setError("An error occurred");
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="login-form-group">
                    <label className="login-label">Username:</label>
                    <input
                        type="text"
                        className="login-input"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className="login-form-group">
                    <label className="login-label">Password:</label>
                    <input
                        type="password"
                        className="login-input"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                {error && <div className="login-error">{error}</div>}
                <button type="submit" className="login-button" disabled={loading}>
                    {loading ? "Loading..." : "Login"}
                </button>
                <button
                    type="button"
                    className="login-secondary-button"
                    onClick={() => navigate("/register")}
                >
                    Register Page
                </button>
            </form>
        </div>
    );
}

export default Login;
