import { useEffect, useState } from "react";
import "../../css/departmentManagement.css";
import { Link } from "react-router-dom";
import axios from "axios";

const SalaryList = () => {
  const [salary, setSalary] = useState([]);

  // Retrieve Salary Data.
  useEffect(() => {
    axios
      .get("http://localhost:8000/")
      .then((result) => {
        setSalary(result.data);
        console.log(result);
      })
      .catch((err) => console.log(err));
  }, []);

  // Delete Record
  const deleteHandler = (id) => {
    axios
      .delete("http://localhost:8000/deleteempSalary/" + id)
      .then((result) => {
        console.log(result);
        location.reload();
      })
      .catch((err) => console.log(err));
  };



  return (
    <div className="container">
      <h2>MANAGE SALARY HISTORY</h2>

      <Link to="/addSalary">
        <button className="btn green addBtn">Add New Salary</button>
      </Link>

      {/* Search bar */}
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search By Departments"
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>S.NO</th>
            <th>EMP NAME</th>
            <th>SALARY</th>
            <th>ALLOWANCE</th>
            <th>DEDUCTIONS</th>
            <th>TOTAL</th>
            <th>PAY DATE</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {salary.map((empSalary, index) => (
            <tr key={empSalary._id}>
              <td>{index + 1}</td>
              <td>{empSalary.name}</td>
              <td>
                <Link to={`/updateSalary/${empSalary._id}`}>
                  <button className="btn green">Update</button>
                </Link>
              </td>
              <td>
                <button
                  className="btn red"
                  onClick={() => deleteHandler(empSalary._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/adminDashboard">
        <button className="backBtn">Back to Dashboard</button>
      </Link>
    </div>
  );
};

export default SalaryList;
