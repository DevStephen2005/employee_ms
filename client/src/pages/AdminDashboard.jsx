import { Link, useNavigate } from 'react-router-dom';
import '../css/adminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate()

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <h2>Employee MS</h2>
                <ul>
                    <li className="active">Dashboard</li>
                    <Link to='/employeeList' > <li>Employees</li> </Link>
                    <Link to='/department' > <li>Departments</li> </Link>
                    <li>Leaves</li>
                    <Link to='/salaryList'> <li>Salary</li> </Link>
                    <li>Setting</li>
                </ul>
                <button className="logout-btn" onClick={() => navigate('/') }>Logout</button>
            </aside>

            <main className="dashboard-content">
                <header className="dashboard-header">
                    <h3>Welcome, Admin</h3>
                </header>
                
                <div className="dashboard-overview">
                      <h2>Dashboard Overview</h2>

                    <div className="overview-card">
                        <h4>Total Employees</h4>
                        <p>5</p>
                    </div>
                    <div className="overview-card">
                        <h4>Total Departments</h4>
                        <p>3</p>
                    </div>
                    <div className="overview-card">
                        <h4>Monthly Pay</h4>
                        <p>$2500</p>
                    </div>
                </div>

                <div className="leave-details">
                    <h3>Leave Details</h3>
                    <div className="leave-card">
                        <h4>Leave Applied</h4>
                        <p>2</p>
                    </div>
                    <div className="leave-card">
                        <h4>Leave Approved</h4>
                        <p>2</p>
                    </div>
                    <div className="leave-card">
                        <h4>Leave Pending</h4>
                        <p>1</p>
                    </div>
                    <div className="leave-card">
                        <h4>Leave Rejected</h4>
                        <p>2</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
