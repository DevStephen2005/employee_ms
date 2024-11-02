import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/getEmp")
      .then((result) => {
        setEmployees(result.data);
        console.log(result);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteHandler = (id) => {
    axios
      .delete("http://localhost:8000/deleteEmp/" + id)
      .then((result) => {
        console.log(result);
        setEmployees(employees.filter((emp) => emp._id !== id));
      })
      .catch((err) => console.log(err));
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h2 className="text-2xl text-black font-semibold">Manage Employees</h2>

      <Link to="/adminDashboard">
        <button className="w-40 bg-blue-700 text-white py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200 text-lg font-semibold flex items-center justify-center">
          <i className="fas fa-arrow-left mr-2"></i>{" "}
          Dashboard
        </button>
      </Link>

      <Link to="/addEmployee">
        <button className="btn green addBtn text-lg font-semibold w-10">
          Add Employee
        </button>
      </Link>

      <div className="searchBar">
        <input
          type="text"
          placeholder="Search By Employee Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table_container">
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
                    src={`http://localhost:8000/uploads/${emp.image}`}
                    alt={emp.name}
                    className="employee-image"
                  />
                </td>
                <td>{emp.name}</td>
                <td>{new Date(emp.dob).toLocaleDateString()}</td>
                <td>{emp.department}</td>
                <td>
                  <Link to={`/viewEmp/${emp._id}`}>
                    <button className="btn blue">View</button>
                  </Link>
                </td>
                <td>
                  <Link to='/leave'> <button className="btn red">Leave</button>  </Link>
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
      </div>
    </div>
  );
};

export default EmployeeList;
