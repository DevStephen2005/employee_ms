import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate email
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one lowercase letter.";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      axios.post('http://localhost:8000/login', formData)
        .then((result) => {
          if (result.data.success) {
            // Redirect based on user role
            if (formData.email.trim() === "admin@gmail.com" && formData.password.trim() === "Admin@100") {
              navigate("/adminDashboard");
            } else {
              navigate('/employeeDashboard');
            }
  
            // Store user data in context
            setUser({
              email: result.data.user.email,
            });
            toast.success(result.data.message); // Show success message
          } else {
            // Handle unsuccessful login
            toast.error(result.data.message); // Show error message from server
            if (result.data.message === 'Password incorrect') {
              setErrors({ password: 'Password incorrect. Please try again.' });
            } else if (result.data.message === 'User not found') {
              setErrors({ email: 'User not found. Please check your email or sign up.' });
            }
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error('An error occurred. Please try again.');
        });
    } else {
      console.log('Validation failed');
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white shadow-md rounded-lg mt-10 border border-black">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <label className="block mb-4 font-semibold ">
          <span className="text-black text-lg">Email Address</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email..."
            className="mt-1 block w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
            required
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </label>

        <label className="block mb-6 font-semibold">
          <span className="text-black text-lg">Password</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password..."
            className="mt-1 block w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            required
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </label>

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 rounded-md text-lg font-semibold hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200"
        >
          Login
        </button>

        <p className="text-center mt-4">
          Don’t have an account? <Link to="/register" className="text-red-500 hover:underline font-semibold">Register here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
