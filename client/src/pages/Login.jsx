import { useState } from 'react';
import '../css/login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
  
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
    } else if (!passwordRegex.test(password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one special character, and one number, and be at least 6 characters long';
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };
  

  const submitHandler = (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      axios.post('http://localhost:8000/login',{email, password })
        .then((result) => {
          if (result.data === 'success') {
            navigate('/employeeDashboard');
            LoginToast();
          
            if(result.data === 'success' && email.trim() === "admin@gmail.com" && password.trim() === "Admin@100"){
              navigate("/adminDashboard")
            }

          } else if (result.data === 'password incorrect') {
            toast.error('Password incorrect');
            setErrors({ password: 'Password incorrect. Please try again.' });
          } else if (result.data === 'user not found') {
            toast.error('User not found');
            setErrors({ email: 'User not found. Please check your email or sign up.' });
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error('An error occurred. Please try again.');
        });
    } 
  };
  

  const LoginToast = () => toast.success('User Login success');

  return (
    <div className='login'>
      <h1>Employee Management System</h1>
      <div className="login-container">
      <form className="login-form" onSubmit={submitHandler}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='Enter the Email'
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Enter the password'
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <button type="submit">Login</button>

        <div className="foot ">
          <span>Not a member?</span>
          <Link to="/register">
            <span className="signup"> Register</span>
          </Link>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Login;
