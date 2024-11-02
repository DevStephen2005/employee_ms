import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ViewEmployee() {
  const [employee, setEmployee] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/viewEmp/${id}`)
      .then((result) => {
        setEmployee(result.data);
        console.log(result);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">Employee Details</h2>

        {/* Check if employee data is available */}
        {employee ? (
          <div className="flex items-center mb-6">
            {/* ViewEmployee Image */}
            <div className="w-1/3 flex justify-center">
              <img
                src={`http://localhost:8000/uploads/${employee.image}`}
                alt={employee.name}
                className="w-40 h-40 rounded-full object-cover border-4 border-gray-200"
              />
            </div>

            {/* Employee Details */}
            <div className="w-2/3 ml-8">
              <p className="text-lg font-semibold mb-3">
                <span className="font-bold mr-3">Name :</span> {employee.name}
              </p>
              <p className="text-lg font-semibold mb-3">
                <span className="font-bold mr-3">Employee ID:</span> {employee.employeeId}
              </p>
              <p className="text-lg font-semibold mb-3">
                <span className="font-bold mr-3">Date of Birth:</span> {new Date(employee.dob).toLocaleDateString()}
              </p>
              <p className="text-lg font-semibold mb-3">
                <span className="font-bold mr-3">Gender:</span> {employee.gender}
              </p>
              <p className="text-lg font-semibold mb-3">
                <span className="font-bold mr-3">Department:</span> {employee.department}
              </p>
              <p className="text-lg font-semibold mb-3">
                <span className="font-bold mr-3">Marital Status:</span> {employee.maritalStatus}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading employee data...</p>
        )}

        <Link to="/employeeList">
          <button className="w-40 bg-blue-700 text-white py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200 text-lg font-semibold flex items-center justify-center mt-4">
            <i className="fas fa-arrow-left mr-2"></i> Back
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ViewEmployee;
