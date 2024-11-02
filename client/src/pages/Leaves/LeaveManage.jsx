import { useEffect, useState } from 'react';
import axios from "axios";

const LeaveManage = () => {
  const [filter, setFilter] = useState("All");
  const [leaves, setLeaves] = useState([]);
  
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/getLeave")
      .then((result) => {
        setLeaves(result.data);
        console.log(result);
      })
      .catch((err) => console.log(err));
  }, []);

  const filteredLeaves = leaves
  .filter((leave) => filter === "All" || leave.status === filter)
  .filter((leave) =>
    (leave.name || "").toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className="p-6 bg-gray-100">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">Manage Leaves</h2>
        <input
          type="text"
          placeholder="Search By Employee Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mt-2 p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="flex justify-center gap-4 mb-4">
        {["Pending", "Approved", "Rejected"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === status ? "bg-teal-700 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">S No</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Leave Type</th>
              <th className="p-3 text-left">From Date</th>
              <th className="p-3 text-left">To Date</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves.map((leave, index) => (
              <tr key={leave.id} className="border-b">
                <td className="p-3">{index + 1}</td>
                <td className="py-2 px-4 border-b">{leave.description}</td>
                <td className="p-3">{leave.leaveType}</td>
                <td className="p-3">{new Date(leave.fromDate).toLocaleDateString()}</td>
                <td className="p-3">{new Date(leave.toDate).toLocaleDateString()}</td>
                <td className={`p-3 ${leave.status === "Approved" ? "text-green-500" : leave.status === "Pending" ? "text-yellow-500" : "text-red-500"}`}>
                  {leave.status}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveManage;
