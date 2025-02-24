import { useState } from "react";
import { auth, database, createUserWithEmailAndPassword, ref, set } from "../Firebase/index";
import {Link, useNavigate } from "react-router-dom";
import "./Signup.css"; // Import CSS

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    country: "",
    city: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Save extra details to Firebase
      await set(ref(database, "users/" + user.uid), {
        name: formData.name,
        email: formData.email,
        gender: formData.gender,
        phone: formData.phone,
        country: formData.country,
        city: formData.city,
      });

      alert("Signup Successful");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Registration</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Enter your name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Enter your email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Create password" onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm password" onChange={handleChange} required />
        <select name="gender" onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input type="text" name="phone" placeholder="Enter your phone number" onChange={handleChange} required />
        <input type="text" name="country" placeholder="Enter your country" onChange={handleChange} required />
        <input type="text" name="city" placeholder="Enter your city" onChange={handleChange} required />
        <button type="submit">Register Now</button>
        <p>
  Do not have an account? <Link to="/login">Login now</Link>
</p>
      </form>
    </div>
  );
};

export default Signup;
