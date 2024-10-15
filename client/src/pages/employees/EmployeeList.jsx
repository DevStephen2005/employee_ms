import "../../css/employeeList.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  // Retrieve employee data
  useEffect(() => {
    axios
      .get("http://localhost:8000/getEmp")
      .then((result) => {
        setEmployees(result.data);
        console.log(result);
      })
      .catch((err) => console.log(err));
  }, []);

  // Delete Record
  const deleteHandler = (id) => {
    axios
      .delete("http://localhost:8000/deleteEmp/" + id)
      .then((result) => {
        console.log(result);
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  // Filter employees based on search input
  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h2>MANAGE EMPLOYEES</h2>

      <Link to="/addEmployee">
        <button className="btn green addBtn">Add Employee</button>
      </Link>

      {/* Search bar */}
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search By Employee Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm state
        />
      </div>

      {/* Employee table */}
      <table className="table">
        <thead>
          <tr>
            <th>S.NO</th>
            <th>Image</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Department</th>
            <th>View</th>
            <th>Leave</th>
            <th>Salary</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {filteredEmployees.map((emp, index) => (
            <tr key={emp._id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={`http://localhost:8000/uploads/${emp.image}`} // Change to emp.image
                  alt={emp.name} // Change to emp.name
                  width="60"
                  height="60"
                />
              </td>
              <td>{emp.name}</td>
              <td>{emp.dob}</td>
              <td>{emp.department}</td>
              <td>
                <button className="btn blue">View</button>
              </td>
              <td>
                <button className="btn red">Leave</button>
              </td>
              <td>
                <button className="btn yellow">Salary</button>
              </td>
              <td>
                <Link to={`/updateEmp/${emp._id}`}>
                  <button className="btn green">Update</button>
                </Link>
              </td>
              <td>
                <button
                  className="btn red"
                  onClick={() => deleteHandler(emp._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to='/adminDashboard' > <button>Back to Dashboard</button> </Link>
    </div>
  );
};

export default EmployeeList;
