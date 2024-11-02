import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: "",
    maritalStatus: "",
    designation: "",
    salary: "",
    department: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8000/getEmp/${id}`)
      .then((result) => setEmployee(result.data))
      .catch((error) => console.log("Error fetching employee data:", error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8000/updateEmp/${id}`, employee)
      .then(() => navigate('/employeeList'))
      .catch((error) => console.log("Error updating employee data:", error));
  };

  return (
    <form className="max-w-md mx-auto mt-10 p-5 border border-black rounded-lg shadow-md" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold mb-5 text-center">Update Employee</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={employee.name}
          onChange={handleChange}
          placeholder="Enter Name"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
        <select
          name="maritalStatus"
          value={employee.maritalStatus}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Status</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Divorced">Divorced</option>
        </select>
        {errors.maritalStatus && <span className="text-red-500 text-sm">{errors.maritalStatus}</span>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
        <input
          type="text"
          name="designation"
          value={employee.designation}
          onChange={handleChange}
          placeholder="Enter Designation"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.designation && <span className="text-red-500 text-sm">{errors.designation}</span>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
        <input
          type="number"
          name="salary"
          value={employee.salary}
          onChange={handleChange}
          placeholder="Enter Salary"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.salary && <span className="text-red-500 text-sm">{errors.salary}</span>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
        <select
          name="department"
          value={employee.department}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Department</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Logistics">Logistics</option>
        </select>
        {errors.department && <span className="text-red-500 text-sm">{errors.department}</span>}
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200 font-semibold">
        Update Employee
      </button>
    </form>
  );
};

export default UpdateEmployee;
