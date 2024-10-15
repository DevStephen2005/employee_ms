import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../../css/updateEmployee.css"; // Updated CSS file name for professionalism

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

  const validateForm = () => {
    const formErrors = {};
    if (!employee.name.trim()) formErrors.name = "Name is required";
    if (!employee.maritalStatus) formErrors.maritalStatus = "Marital Status is required";
    if (!employee.designation.trim()) formErrors.designation = "Designation is required";
    if (!employee.salary || isNaN(employee.salary) || employee.salary <= 0) formErrors.salary = "Salary must be a positive number";
    if (!employee.department) formErrors.department = "Department is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios.put(`http://localhost:8000/updateEmp/${id}`,employee)
        .then(() => navigate('/employeeList'))
        .catch((error) => console.log("Error updating employee data:", error));
    }
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <h2>Update Employee</h2>

      <div className="form-row">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            placeholder="Enter Name"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label>Marital Status</label>
          <select
            name="maritalStatus"
            value={employee.maritalStatus}
            onChange={handleChange}
          >
            <option value="">Select Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
          </select>
          {errors.maritalStatus && <span className="error">{errors.maritalStatus}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Designation</label>
          <input
            type="text"
            name="designation"
            value={employee.designation}
            onChange={handleChange}
            placeholder="Enter Designation"
          />
          {errors.designation && <span className="error">{errors.designation}</span>}
        </div>
        <div className="form-group">
          <label>Salary</label>
          <input
            type="number"
            name="salary"
            value={employee.salary}
            onChange={handleChange}
            placeholder="Enter Salary"
          />
          {errors.salary && <span className="error">{errors.salary}</span>}
        </div>
      </div>

      <div className="form-group">
        <label>Department</label>
        <select
          name="department"
          value={employee.department}
          onChange={handleChange}
        >
          <option value="">Select Department</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Logistics">Logistics</option>
        </select>
        {errors.department && <span className="error">{errors.department}</span>}
      </div>

      <button type="submit" className="btn-submit">Update Employee</button>
    </form>
  );
};

export default UpdateEmployee;
