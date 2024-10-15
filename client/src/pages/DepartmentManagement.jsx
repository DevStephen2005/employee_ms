import { useEffect, useState } from "react";
import "../css/departmentManagement.css";
import { Link } from "react-router-dom";
import axios from "axios";

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  // Retrieve Department Data.
  useEffect(() => {
    axios
      .get("http://localhost:8000/")
      .then((result) => {
        setDepartments(result.data);
        console.log(result);
      })
      .catch((err) => console.log(err));
  }, []);

  // Delete Record
  const deleteHandler = (id) => {
    axios
      .delete("http://localhost:8000/deleteDept/" + id)
      .then((result) => {
        console.log(result);
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  // Filtered departments based on search input
  const filteredDepartments = departments.filter((dept) =>
    dept.departmentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h2>MANAGE DEPARTMENTS</h2>

      <Link to="/addDepartment">
        <button className="btn green addBtn">Add Department</button>
      </Link>

      {/* Search bar */}
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search By Departments"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm state
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>S.NO</th>
            <th>Department</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {filteredDepartments.map((dept, index) => (
            <tr key={dept._id}>
              <td>{index + 1}</td>
              <td>{dept.departmentName}</td>
              <td>
                <Link to={`/updateDept/${dept._id}`}>
                  <button className="btn green">Update</button>
                </Link>
              </td>
              <td>
                <button
                  className="btn red"
                  onClick={() => deleteHandler(dept._id)}
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

export default DepartmentManagement;
