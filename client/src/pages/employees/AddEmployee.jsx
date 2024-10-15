import {  useState } from 'react';
import '../../css/addEmployee.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [file,setFile] = useState()


  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!employeeData.name.trim()) newErrors.name = "Name is required";
    if (!employeeData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(employeeData.email)) newErrors.email = "Email is invalid";
    
    if (!employeeData.employeeId.trim()) newErrors.employeeId = "Employee ID is required";
    if (!employeeData.dob) newErrors.dob = "Date of Birth is required";
    if (!employeeData.gender) newErrors.gender = "Gender is required";
    if (!employeeData.designation.trim()) newErrors.designation = "Designation is required";
    if (!employeeData.department) newErrors.department = "Department is required";
    
    if (!employeeData.salary.trim()) newErrors.salary = "Salary is required";
    else if (isNaN(employeeData.salary)) newErrors.salary = "Salary must be a number";

    if (!employeeData.password.trim()) newErrors.password = "Password is required";
    else if (employeeData.password.length < 6) newErrors.password = "Password must be at least 6 characters";


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    // Create a FormData object to handle file uploads and other data
    const formData = new FormData();
    formData.append('name', employeeData.name);
    formData.append('email', employeeData.email);
    formData.append('employeeId', employeeData.employeeId);
    formData.append('dob', employeeData.dob);
    formData.append('gender', employeeData.gender);
    formData.append('maritalStatus', employeeData.maritalStatus);
    formData.append('designation', employeeData.designation);
    formData.append('department', employeeData.department);
    formData.append('salary', employeeData.salary);
    formData.append('password', employeeData.password);
    formData.append('role', employeeData.role);

    // Add file data separately
    formData.append('file',file)
    console.log(file);
  
    // Submit the form data to the server
    axios.post('http://localhost:8000/addEmp',formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((result) => {
        console.log(result);
        navigate('/employeeList');
      })
      .catch((err) => console.log(err));
  };


  

  return (
    <form className="add-employee-form" onSubmit={handleSubmit}>
      <h2>Add New Employee</h2>
      <div className="form-row">
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" value={employeeData.name} onChange={handleChange} placeholder="Enter Name" />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={employeeData.email} onChange={handleChange} placeholder="Enter Email" />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Employee ID</label>
          <input type="text" name="employeeId" value={employeeData.employeeId} onChange={handleChange} placeholder="Enter Employee ID" />
          {errors.employeeId && <span className="error">{errors.employeeId}</span>}
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input type="date" name="dob" value={employeeData.dob} onChange={handleChange} />
          {errors.dob && <span className="error">{errors.dob}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Gender</label>
          <select name="gender" value={employeeData.gender} onChange={handleChange}>
            <option>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <span className="error">{errors.gender}</span>}
        </div>
        <div className="form-group">
          <label>Marital Status</label>
          <select name="maritalStatus" value={employeeData.maritalStatus} onChange={handleChange}>
            <option>Select Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Designation</label>
          <input type="text" name="designation" value={employeeData.designation} onChange={handleChange} placeholder="Enter Designation" />
          {errors.designation && <span className="error">{errors.designation}</span>}
        </div>
        <div className="form-group">
          <label>Department</label>
          <select name="department" value={employeeData.department} onChange={handleChange}>
            <option>Select Department</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Logistics">Logistics</option>
            <option value="Finance">Finance</option>
          </select>
          {errors.department && <span className="error">{errors.department}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Salary</label>
          <input type="text" name="salary" value={employeeData.salary} onChange={handleChange} placeholder="Enter Salary" />
          {errors.salary && <span className="error">{errors.salary}</span>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={employeeData.password} onChange={handleChange} placeholder="*****" />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Role</label>
          <select name="role" value={employeeData.role} onChange={handleChange}>
            <option>Select Role</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
        </div>
        <div className="form-group">
          <label>Upload Image</label>
          <input type="file" name="file" onChange={(e) => setFile(e.target.files[0])} />
          {errors.image && <span className="error">{errors.image}</span>}
        </div>
      </div>

      <button type="submit" className="submit-button" >Add Employee</button>
    </form>
  );
};

export default AddEmployee;
