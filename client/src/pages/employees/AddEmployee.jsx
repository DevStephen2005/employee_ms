import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const [employeeData, setEmployeeData] = useState({});
  
  const [file, setFile] = useState();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const requiredFields = ['name', 'email', 'employeeId', 'dob', 'gender', 'designation', 'department', 'salary', 'password'];
    const newErrors = requiredFields.reduce((acc, field) => {
      if (!employeeData[field]?.trim()) acc[field] = `${field[0].toUpperCase() + field.slice(1)} is required`;
      if (field === 'email' && !/\S+@\S+\.\S+/.test(employeeData.email)) acc.email = "Invalid email format";
      if (field === 'salary' && isNaN(employeeData.salary)) acc.salary = "Salary must be a number";
      if (field === 'password' && employeeData.password?.length < 6) acc.password = "Password must be at least 6 characters";
      return acc;
    }, {});

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const formData = new FormData();

    const formattedDob = new Date(employeeData.dob).toISOString().slice(0, 10);
    
    formData.append('dob', formattedDob);
    
    Object.keys(employeeData).forEach((key) => {
        if (key !== 'dob') {
            formData.append(key, employeeData[key]);
        }
    });
    formData.append('file', file);

    axios.post('http://localhost:8000/addEmp', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then(() => navigate('/employeeList'))
    .catch((err) => console.log(err));
  };

  const renderInput = (label, type, name, placeholder = "") => (
    <div className="flex flex-col mb-4">
      <label className="text-gray-600 font-medium">{label}</label>
      <input
        type={type}
        name={name}
        value={employeeData[name] || ''}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
      />
      {errors[name] && <span className="text-red-500 text-sm mt-1">{errors[name]}</span>}
    </div>
  );

  const renderSelect = (label, name, options) => (
    <div className="flex flex-col mb-4 ">
      <label className="text-gray-600 font-medium">{label}</label>
      <select
        name={name}
        value={employeeData[name] || ''}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option.toLowerCase()}>{option}</option>
        ))}
      </select>
      {errors[name] && <span className="text-red-500 text-sm mt-1">{errors[name]}</span>}
    </div>
  );

  return (
    <form className="max-w-xl mx-auto p-6 bg-gray-100 border border-black rounded-lg shadow-md mt-10" onSubmit={handleSubmit}>
      <h2 className="text-center text-2xl font-bold text-black mb-6">Add New Employee</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderInput('Name', 'text', 'name', 'Enter Name')}
        {renderInput('Email', 'email', 'email', 'Enter Email')}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderInput('Employee ID', 'text', 'employeeId', 'Enter Employee ID')}
        {renderInput('Date of Birth', 'date', 'dob')}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderSelect('Gender', 'gender', ['Male', 'Female', 'Other'])}
        {renderSelect('Marital Status', 'maritalStatus', ['Single', 'Married', 'Divorced'])}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderInput('Designation', 'text', 'designation', 'Enter Designation')}
        {renderSelect('Department', 'department', ['IT', 'HR', 'Logistics', 'Finance'])}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderInput('Salary', 'text', 'salary', 'Enter Salary')}
        {renderInput('Password', 'password', 'password', '*****')}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderSelect('Role', 'role', ['Admin', 'Employee'])}
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium">Upload Image</label>
          <input
            type="file"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
          />
        </div>
      </div>

      <button type="submit" className="w-full bg-green-500 text-white py-2 mt-4 rounded hover:bg-green-600 font-semibold">
        Add Employee
      </button>
    </form>
  );
};

export default AddEmployee;
