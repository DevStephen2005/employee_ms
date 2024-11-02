import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import 'react-toastify/dist/ReactToastify.css'; // Import CSS
import { ToastContainer } from 'react-toastify';
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployeeList from "./pages/employees/EmployeeList";
import AddEmployee from "./pages/employees/AddEmployee";
import UpdateEmployee from "./pages/employees/UpdateEmployee";
import AddSalary from "./pages/salarys/AddSalary";
import SalaryList from "./pages/salarys/SalaryList";
import DepartmentManagement from "./pages/departments/DepartmentManagement";
import AddDepartment from "./pages/departments/AddDepartment";
import UpdateDept from "./pages/departments/UpdateDept";
import Register from "./pages/Register";
import UpdateSalary from "./pages/salarys/UpdateSalary";
import ViewEmployee from "./pages/employees/ViewEmployee";
import LeaveList from "./pages/Leaves/LeaveList";
import AddLeave from "./pages/Leaves/AddLeave";
import SalaryHistory from "./pages/SalaryHistory";
import Settings from "./pages/Settings";
import LeaveManage from "./pages/Leaves/LeaveManage";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer /> {/* Add the ToastContainer here */}
      <Routes>
        {/* Authentication Routes  */}
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>

        <Route path="/adminDashboard" element={<AdminDashboard />}></Route>
        <Route path="/employeeDashboard" element={<EmployeeDashboard />}></Route>

        {/* Department Routes  */}
        <Route path="/department" element={<DepartmentManagement />}></Route>
        <Route path="/addDepartment" element={<AddDepartment />}></Route>
        <Route path="/updateDept/:id" element={<UpdateDept />}></Route>

        {/* Employee Routes */}
        <Route path="/employeeList" element={<EmployeeList />}></Route>
        <Route path="/addEmployee" element={<AddEmployee />}></Route>
        <Route path="/updateEmp/:id" element={<UpdateEmployee />}></Route>
        <Route path="/viewEmp/:id" element={<ViewEmployee />}></Route>

        {/* Salary Routes */}
        <Route path="/salaryList" element={<SalaryList />}></Route>
        <Route path="/addSalary" element={<AddSalary />}></Route>
        <Route path="/updateSalary/:id" element={<UpdateSalary />}></Route>

        {/* Leave routes  */}
        <Route path="/leave" element={<LeaveList />}></Route>
        <Route path="/addLeave" element={<AddLeave />}></Route>
        <Route path="/salaryHistory" element={<SalaryHistory />}></Route>
        <Route path="/updatePassword" element={<Settings />}></Route>
        <Route path="/leaveManage" element={<LeaveManage />}></Route>

        
      </Routes>

    </BrowserRouter>
  );
}

export default App;
