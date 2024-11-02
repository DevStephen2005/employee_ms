import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";


const LeaveList = () => {
  const [searchStatus, setSearchStatus] = useState('');
  const [leaves, setLeaves] = useState([]);

  const handleSearch = (e) => {
    setSearchStatus(e.target.value);
  };

  const filteredLeaves = leaves.filter((leave) =>
    leave.status.toLowerCase().includes(searchStatus.toLowerCase())
  );

  useEffect(() => {
    axios
      .get("http://localhost:8000/getLeave")
      .then((result) => {
        setLeaves(result.data);
        console.log(result);
      })
      .catch((err) => console.log(err));
  }, []);


  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-semibold text-center mb-4">Manage Leaves</h2>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search By Status"
          value={searchStatus}
          onChange={handleSearch}
          className="border border-black rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Link to='/addLeave'> 
        <button className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-600 font-semibold">
          Add Leave
        </button>
         </Link>
      </div>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">S.No</th>
            <th className="py-2 px-4 border-b">Leave Type</th>
            <th className="py-2 px-4 border-b">From</th>
            <th className="py-2 px-4 border-b">To</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Applied Date</th>
            <th className="py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeaves.map((leave, index) => (
            <tr key={leave.id} className="text-center">
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{leave.leaveType}</td>
              <td className="py-2 px-4 border-b">{new Date(leave.fromDate).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">{new Date(leave.toDate).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">{leave.description}</td>
              <td className="py-2 px-4 border-b">{new Date(leave.appliedDate).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default LeaveList;
