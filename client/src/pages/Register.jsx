import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

function Register() {
  const navigate = useNavigate();
  const {setUser} = useAuth()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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
  
    if (!formData.name) {
      newErrors.name = "First name is required.";
      console.log("Validation Error: Name is missing");
    }
    if (!formData.email) {
      newErrors.email = "Email is required.";
      console.log("Validation Error: Email is missing");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
      console.log("Validation Error: Invalid email format");
    }
  
    if (!formData.password) {
      newErrors.password = "Password is required.";
      console.log("Validation Error: Password is missing");
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      console.log("Validation Error: Password is too short");
    }
  
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
      console.log("Validation Error: Confirm password is missing");
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match.";
      console.log("Validation Error: Passwords do not match");
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // If validation passes, send the form data to the backend
      axios.post("http://localhost:8000/signup", formData)
        .then((result) => {
          console.log(result);
          navigate('/');
          if (result) {
            // Store user data in context
            setUser({
              name: result.data.name
            })
          console.log(result.data.name)
          
        }
        })
        .catch((err) => {
          console.error(err);
          toast.error('Failed to register');
        });
    } else {
      console.log('Validation failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white shadow-md rounded-lg mt-10 border border-black">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

        <label className="block mb-4 font-semibold">
          <span className="text-gray-700">Name</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter first name..."
            className="mt-1 block w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            required
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </label>

        <label className="block mb-4 font-semibold">
          <span className="text-gray-700">Email Address</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email..."
            className="mt-1 block w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            required
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </label>

        <label className="block mb-4 font-semibold">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password..."
            className="mt-1 block w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            required
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </label>

        <label className="block mb-4 font-semibold">
          <span className="text-gray-700">Confirm Password</span>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter password..."
            className="mt-1 block w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            required
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        </label>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200 text-lg font-semibold"
        >
          Submit
        </button>

        <p className="text-center mt-4">
          Already have an account? <Link to="/" className="text-red-500 hover:underline text-lg font-semibold">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
