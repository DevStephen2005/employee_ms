import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Signup from "./pages/Signup";
import DepartmentManagement from "./pages/DepartmentManagement";
import AddDepartment from "./pages/AddDepartment";
import UpdateDept from "./pages/UpdateDept";
import EmployeeList from "./pages/employees/EmployeeList";
import AddEmployee from "./pages/employees/AddEmployee";
import UpdateEmployee from "./pages/employees/UpdateEmployee";
import AddSalary from "./pages/salarys/AddSalary";
import SalaryList from "./pages/salarys/SalaryList";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Signup />}></Route>

        <Route path="/adminDashboard" element={<AdminDashboard />}></Route>
        <Route path="/employeeDashboard" element={<EmployeeDashboard />}></Route>

        <Route path="/department" element={<DepartmentManagement />}></Route>
        <Route path="/addDepartment" element={<AddDepartment />}></Route>
        <Route path="/updateDept/:id" element={<UpdateDept />}></Route>

        <Route path="/employeeList" element={<EmployeeList />}></Route>
        <Route path="/addEmployee" element={<AddEmployee />}></Route>
        <Route path="/updateEmp/:id" element={<UpdateEmployee />}></Route>
        <Route path="/salaryList" element={<SalaryList />}></Route>
        <Route path="/addSalary" element={<AddSalary />}></Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;
