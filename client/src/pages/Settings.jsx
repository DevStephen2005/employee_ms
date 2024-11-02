import { useState } from "react";
import {  useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from "axios";

const Settings = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Assuming user contains email

  const [passwords, setPasswords] = useState({ 
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value
    }));
  };

  const handlePasswordChange = () => {
    // Add the email to the passwords object
    const payload = {
      email: user.email, // Include the user's email
      ...passwords // Spread in the passwords object
    };

    // Make the PUT request
    axios.put('http://localhost:8000/updatePassword', payload)
      .then((result) => {
         console.log(result)
        navigate('/employeeDashboard')
        })
      .catch((error) => console.log("Error updating Password data:", error));

    console.log("Password change request submitted", payload);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-black mb-6 text-center">Change Password</h2>


        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-semibold">New Password</label>
          <input
            type="password"
            name="newPassword"
            placeholder="Enter new password"
            value={passwords.newPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-semibold">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm new password"
            value={passwords.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          onClick={handlePasswordChange}
          className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition-colors"
        >
          Change Password
        </button>
      </div>
    </div>
  );
};

export default Settings;
