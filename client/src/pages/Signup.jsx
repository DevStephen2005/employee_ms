import { useState } from 'react';
import '../css/signup.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState({}); // State for validation errors

  const validateForm = () => {
    const newErrors = {};
  
    // Validate name
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
  
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }
  
    // Validate password
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,}$/;
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!passwordRegex.test(password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one special character, and one number';
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };
  

  const submitHandler = (e) => {
    e.preventDefault();

    if (validateForm()) {
      axios
        .post('http://localhost:8000/signup', { name, email, password })
        .then((result) => {
          console.log(result);
          navigate('/');
          toast.success('User Registered');
        })
        .catch((err) => console.log(err));
    } else {
      // toast.error('Please fix the validation errors'); 
    }
    
  };

  const clearInputs = () => {
    setName('')
    setEmail('')
    setPassword('')
  }

  return (
    <div className="signup-container ">
      <h2>Register</h2>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <button type="submit" className="signup-button">Sign Up</button>

        <div className="foot mt-4">
          <span>Already a member?</span>
          <Link to="/">
            <span className="login">Login</span>
          </Link>
          <span className="clear" onClick={clearInputs}>Clear</span>

        </div>
      </form>
    </div>
  );
};

export default Signup;
