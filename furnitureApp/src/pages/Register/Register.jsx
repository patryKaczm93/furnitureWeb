import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.scss";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    if (!username || !password || !email || !verifyPassword) { 
      setError("Username, password, and email are required");
      return false;
    } else if (password !== verifyPassword) {
      setError("Passwords do not match");
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
      const response = await fetch("http://localhost:8000/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          email,
          firstname,
          lastname,
          verify_password: verifyPassword, 
        }),
      });

      setLoading(false);

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.access_token);
        navigate("/protected");
      } else {
        const errorData = await response.json();
        if (errorData.detail) {
          setError(errorData.detail);
        } else {
          setError("Authentication failed");
        }
      }
    } catch (error) {
      setLoading(false);
      setError("An error occurred");
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Confirm password:</label>
          <input
            type="password"
            value={verifyPassword} 
            onChange={(e) => setVerifyPassword(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">First Name:</label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Last Name:</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            className="form-input"
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? "Logging in..." : "Register"}
        </button>
        <button type="button" onClick={() => navigate("/login")} className="register-button">
          Already have an account? Login
        </button>
      </form>
    </div>
  );
}

export default Register;
