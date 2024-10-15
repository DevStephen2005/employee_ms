import { useState } from "react";
import "../../css/addSalary.css"; // Importing the CSS file
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddSalary = () => {
  const navigate = useNavigate();
  
  // Separate states for each field
  const [department, setDepartment] = useState("");
  const [name, setName] = useState("");
  const [basicSalary, setBasicSalary] = useState("");
  const [allowances, setAllowances] = useState("");
  const [deductions, setDeductions] = useState("");
  const [payDate, setPayDate] = useState("");
  
  const [errors, setErrors] = useState({}); // State for storing error messages

  const validate = () => {
    const newErrors = {};
    if (!department) newErrors.department = "Department is required.";
    if (!name) newErrors.name = "Name is required.";
    if (!basicSalary || basicSalary <= 0) newErrors.basicSalary = "Basic Salary must be positive.";
    if (!allowances || allowances < 0) newErrors.allowances = "Allowances cannot be negative.";
    if (!deductions || deductions < 0) newErrors.deductions = "Deductions cannot be negative.";
    if (!payDate) newErrors.payDate = "Pay Date is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return; // Stop submission if validation fails

    // Prepare data for submission
    const salaryData = {
      department,
      name,
      basicSalary,
      allowances,
      deductions,
      payDate
    };

    console.log(salaryData);

    // Submit the form data to the server
    axios.post('http://localhost:8000/addSalary', salaryData)
      .then((result) => {
        console.log(result);
        navigate('/salaryList');
      })
      .catch(console.log);
  };

  return (
    <div className="salary-container">
      <h2>Add New Salary</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <select value={department} onChange={(e) => setDepartment(e.target.value)}>
              <option value="">Select Department</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
            </select>
            {errors.department && <p className="error">{errors.department}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="basicSalary">Basic Salary</label>
            <input type="number" value={basicSalary} onChange={(e) => setBasicSalary(e.target.value)} placeholder="Enter Salary" />
            {errors.basicSalary && <p className="error">{errors.basicSalary}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="allowances">Allowances</label>
            <input type="number" value={allowances} onChange={(e) => setAllowances(e.target.value)} placeholder="Enter Monthly Allowances" />
            {errors.allowances && <p className="error">{errors.allowances}</p>}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="deductions">Deductions</label>
            <input type="number" value={deductions} onChange={(e) => setDeductions(e.target.value)} placeholder="Enter Monthly Deductions" />
            {errors.deductions && <p className="error">{errors.deductions}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="payDate">Pay Date</label>
            <input type="date" value={payDate} onChange={(e) => setPayDate(e.target.value)} />
            {errors.payDate && <p className="error">{errors.payDate}</p>}
          </div>
        </div>
        <button type="submit" className="btn-submit">Add Salary</button>
      </form>
    </div>
  );
};

export default AddSalary;
