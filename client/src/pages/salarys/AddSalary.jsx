import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddSalary = () => {
  const navigate = useNavigate();

  // Single state object to manage all form fields
  const [salaryData, setSalaryData] = useState({
    department: "",
    name: "",
    basicSalary: "",
    allowances: "",
    deductions: "",
    payDate: ""
  });
  
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!salaryData.department) newErrors.department = "Department is required.";
    if (!salaryData.name) newErrors.name = "Name is required.";
    if (!salaryData.basicSalary || salaryData.basicSalary <= 0) newErrors.basicSalary = "Basic Salary must be positive.";
    if (!salaryData.allowances || salaryData.allowances < 0) newErrors.allowances = "Allowances cannot be negative.";
    if (!salaryData.deductions || salaryData.deductions < 0) newErrors.deductions = "Deductions cannot be negative.";
    if (!salaryData.payDate) newErrors.payDate = "Pay Date is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalaryData({
      ...salaryData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    axios.post('http://localhost:8000/addSalary', salaryData)
      .then((result) => {
        console.log(result);
        navigate('/salaryList');
      })
      .catch(console.log)
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Add New Salary</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <label htmlFor="department" className="block text-gray-700 font-medium mb-2">Department</label>
            <select
              name="department"
              value={salaryData.department}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Department</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
            </select>
            {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
          </div>
          
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={salaryData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <label htmlFor="basicSalary" className="block text-gray-700 font-medium mb-2">Basic Salary</label>
            <input
              type="number"
              name="basicSalary"
              value={salaryData.basicSalary}
              onChange={handleChange}
              placeholder="Enter Salary"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.basicSalary && <p className="text-red-500 text-sm mt-1">{errors.basicSalary}</p>}
          </div>
          
          <div>
            <label htmlFor="allowances" className="block text-gray-700 font-medium mb-2">Allowances</label>
            <input
              type="number"
              name="allowances"
              value={salaryData.allowances}
              onChange={handleChange}
              placeholder="Enter Monthly Allowances"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.allowances && <p className="text-red-500 text-sm mt-1">{errors.allowances}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="deductions" className="block text-gray-700 font-medium mb-2">Deductions</label>
            <input
              type="number"
              name="deductions"
              value={salaryData.deductions}
              onChange={handleChange}
              placeholder="Enter Monthly Deductions"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.deductions && <p className="text-red-500 text-sm mt-1">{errors.deductions}</p>}
          </div>
          
          <div>
            <label htmlFor="payDate" className="block text-gray-700 font-medium mb-2">Pay Date</label>
            <input
              type="date"
              name="payDate"
              value={salaryData.payDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.payDate && <p className="text-red-500 text-sm mt-1">{errors.payDate}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          Add Salary
        </button>
      </form>
    </div>
  );
};

export default AddSalary;
