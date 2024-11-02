import { Link } from "react-router-dom";


function EmployeeDashboard() {

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-6 text-3xl font-semibold">
          <ul>
            <li>Employee MS</li>
          </ul>
        </div>
        <div className="flex-1">
          <ul>
            <li className="px-4 py-2 hover:bg-blue-700 cursor-pointer text-lg font-semibold mb-3 mt-4">
              Dashboard
            </li>

            <Link to='/leave'>
            <li className="px-4 py-2 hover:bg-blue-700 cursor-pointer text-lg font-semibold mb-3">
              Leave
            </li>
            </Link>

            <Link to='/salaryHistory'>
            <li className="px-4 py-2 hover:bg-blue-700 cursor-pointer text-lg font-semibold mb-3">
              Salary
            </li>
            </Link>

            <Link to='/updatePassword'>
            <li className="px-4 py-2 hover:bg-blue-700 cursor-pointer text-lg font-semibold mb-3">
              Settings
            </li>
            </Link>
          </ul>
          
        </div>
        <Link to='/'>
        <button className="red logoutBtn text-lg font-semibold mb-20 ml-5">
            Logout
          </button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="flex justify-between items-center bg-teal-600 p-4 text-white">
          <span className="text-xl font-medium">Welcome</span>
          
        </div>
        <div className="p-8">
          <div className="text-3xl font-bold text-gray-800">Welcome Back</div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
