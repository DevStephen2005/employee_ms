import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalEmployees: 0,
    totalDepartments: 0,
    monthlyPay: 0,
    leaveDetails: {
      applied: 0,
      approved: 0,
      pending: 0,
      rejected: 0,
    },
  });

  useEffect(() => {
    // Fetch data from API using Axios
    axios.get("http://localhost:8000/adminDashboard")
      .then(response => {
        const data = response.data;
        setDashboardData({
          totalEmployees: data.totalEmployees,
          totalDepartments: data.totalDepartments,
          monthlyPay: data.monthlyPay,
          leaveDetails: {
            applied: data.leaveDetails.applied,
            approved: data.leaveDetails.approved,
            pending: data.leaveDetails.pending,
            rejected: data.leaveDetails.rejected,
          },
        });
      })
      .catch(error => console.error("Error fetching dashboard data:", error));
  }, []);

  return (
    <div className="bg-teal-100 min-h-screen flex">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-900 text-white p-5 space-y-4">
        <h1 className="text-2xl font-bold mb-8">Employee MS</h1>
        <ul className="space-y-4">
          <li className="text-green-500 font-bold cursor-pointer hover:bg-gray-700 p-2 rounded">
            Dashboard
          </li>
          <Link to='/employeeList' > <li className="cursor-pointer hover:bg-blue-700 p-2 rounded font-semibold text-lg mt-5">Employees</li> </Link>
          <Link to='/department' > <li className="cursor-pointer hover:bg-blue-700 p-2 rounded font-semibold text-lg mt-5">Departments</li> </Link>
          <Link to='/leaveManage' > <li className="cursor-pointer hover:bg-blue-700 p-2 rounded font-semibold text-lg mt-5">Leaves</li> </Link>
          <Link to='/salaryList' > <li className="cursor-pointer hover:bg-blue-700 p-2 rounded font-semibold text-lg mt-5">Salary</li> </Link>
          <Link to='/updatePassword' > <li className="cursor-pointer hover:bg-blue-700 p-2 rounded font-semibold text-lg mt-5">Setting</li> </Link>

          <Link to='/'>
            <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 font-semibold w-40 relative top-10">
             Logout
            </button>
          </Link>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-10">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold">Dashboard Overview</h2>
        </header>

        {/* Overview Section */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded shadow-md flex items-center transform hover:scale-105 hover:shadow-lg transition duration-300">
            <div className="text-3xl text-gray-800">{dashboardData.totalEmployees}</div>
            <div className="ml-4">
              <p className="text-black font-bold text-lg">Total Employees</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded shadow-md flex items-center transform hover:scale-105 hover:shadow-lg transition duration-300">
            <div className="text-3xl text-gray-800">{dashboardData.totalDepartments}</div>
            <div className="ml-4">
              <p className="text-black font-bold text-lg">Total Departments</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded shadow-md flex items-center transform hover:scale-105 hover:shadow-lg transition duration-300">
            <div className="text-3xl text-gray-800">${dashboardData.monthlyPay}</div>
            <div className="ml-4">
              <p className="text-black font-bold text-lg">Monthly Pay</p>
            </div>
          </div>
        </div>

        {/* Leave Details Section */}
        <h3 className="text-2xl font-semibold mb-4">Leave Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded shadow-md flex items-center transform hover:scale-105 hover:shadow-lg transition duration-300">
            <div className="text-2xl text-gray-800">{dashboardData.leaveDetails.applied}</div>
            <div className="ml-4">
              <p className="text-black font-bold">Leave Applied</p>
            </div>
          </div>
          <div className="bg-green-100 p-6 rounded shadow-md flex items-center transform hover:scale-105 hover:shadow-lg transition duration-300">
            <div className="text-2xl text-green-600">{dashboardData.leaveDetails.approved}</div>
            <div className="ml-4">
              <p className="text-green-700 font-bold text-lg">Leave Approved</p>
            </div>
          </div>
          <div className="bg-yellow-100 p-6 rounded shadow-md flex items-center transform hover:scale-105 hover:shadow-lg transition duration-300">
            <div className="text-2xl text-yellow-600">{dashboardData.leaveDetails.pending}</div>
            <div className="ml-4">
              <p className="text-yellow-700 font-bold text-lg">Leave Pending</p>
            </div>
          </div>
          <div className="bg-red-100 p-6 rounded shadow-md flex items-center transform hover:scale-105 hover:shadow-lg transition duration-300">
            <div className="text-2xl text-red-600">{dashboardData.leaveDetails.rejected}</div>
            <div className="ml-4">
              <p className="text-red-600 font-bold text-lg">Leave Rejected</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
