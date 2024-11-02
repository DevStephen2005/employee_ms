import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SalaryHistory = () => {
  const [salary, setSalary] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Retrieve Salary Data
  useEffect(() => {
    axios
      .get("http://localhost:8000/getSalary")
      .then((result) => {
        setSalary(result.data);
        console.log(result);
      })
      .catch((err) => console.log(err));
  }, []);

  // Filtered salary data based on search term
  const filteredSalary = salary.filter(empSalary =>
    empSalary.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h2 className="text-2xl text-black font-semibold">SALARY HISTORY</h2>
      
      <Link to="/employeeDashboard">
        <button className="w-40 bg-blue-700 text-white py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200 text-lg font-semibold flex items-center justify-center">
          <i className="fas fa-arrow-left mr-2"></i>{" "}
          Dashboard
        </button>
      </Link>

      {/* Search bar */}
      <div className="searchBar mb-4">
        <input 
          type="text" 
          placeholder="Search By Employee" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update the search term state
          className="border rounded p-2 w-full"
        />
      </div>

      <table className="table w-full">
        <thead>
          <tr>
            <th>S.NO</th>
            <th>EMP NAME</th>
            <th>BASIC SALARY</th>
            <th>ALLOWANCE</th>
            <th>DEDUCTIONS</th>
            <th>TOTAL</th>
            <th>PAY DATE</th>
          </tr>
        </thead>

        <tbody>
          {filteredSalary.length > 0 ? (
            filteredSalary.map((empSalary, index) => {
              // Calculate total salary
              const totalSalary = empSalary.basicSalary + empSalary.allowances - empSalary.deductions;

              return (
                <tr key={empSalary._id}>
                  <td>{index + 1}</td>
                  <td>{empSalary.name}</td>
                  <td>{empSalary.basicSalary}</td>
                  <td>{empSalary.allowances}</td>
                  <td>{empSalary.deductions}</td>
                  <td>{totalSalary}</td> {/* Display calculated total */}
                  <td>{new Date(empSalary.payDate).toLocaleDateString()}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No records found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SalaryHistory;
