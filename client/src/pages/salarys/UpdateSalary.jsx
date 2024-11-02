import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateSalary = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Set initial state with default values to prevent null reference
  const [salaryData, setSalaryData] = useState({
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    payDate: "",
  });
  const [loading, setLoading] = useState(true); // Loading state
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchSalaryData = async () => {
      try {
        const result = await axios.get(`http://localhost:8000/getSalary/${id}`);
        setSalaryData(result.data);
      } catch (error) {
        console.log("Error fetching salary data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchSalaryData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalaryData({ ...salaryData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8000/updateSalary/${id}`, salaryData)
      .then(() => navigate('/salaryList'))
      .catch((error) => console.log("Error updating salary data:", error));
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading message while fetching data
  }

  return (
    <form className="max-w-md mx-auto mt-20 p-5 border border-black rounded-lg shadow-md" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold mb-5">Update Salary</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Basic Salary</label>
        <input
          type="number"
          name="basicSalary"
          value={salaryData.basicSalary}
          onChange={handleChange}
          placeholder="Enter Basic Salary"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        {errors.basicSalary && <span className="text-red-500 text-sm">{errors.basicSalary}</span>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Allowances</label>
        <input
          type="number"
          name="allowances"
          value={salaryData.allowances}
          onChange={handleChange}
          placeholder="Enter Allowances"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        {errors.allowances && <span className="text-red-500 text-sm">{errors.allowances}</span>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Deductions</label>
        <input
          type="number"
          name="deductions"
          value={salaryData.deductions}
          onChange={handleChange}
          placeholder="Enter Deductions"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        {errors.deductions && <span className="text-red-500 text-sm">{errors.deductions}</span>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Pay Date</label>
        <input
          type="date"
          name="payDate"
          value={salaryData.payDate}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        {errors.payDate && <span className="text-red-500 text-sm">{errors.payDate}</span>}
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200">
        Update Salary
      </button>
    </form>
  );
};

export default UpdateSalary;
