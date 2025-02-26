import { useState } from "react";
import { auth, signInWithEmailAndPassword } from "../Firebase/index";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"; // Import CSS

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful");
      navigate("/dashboard"); // Redirect after login
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="center">
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p>
          Do not have an account? <Link to="/Pages/Signup">Sign up now</Link>
        </p>
      </form>
    </div>
    </div>
  );
};

export default Login;
