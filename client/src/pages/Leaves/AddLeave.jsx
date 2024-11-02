import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddLeave = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    leaveType: '',
    fromDate: '',
    toDate: '',
    description: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error when user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.leaveType) newErrors.leaveType = 'Leave type is required.';
    if (!formData.fromDate) newErrors.fromDate = 'From date is required.';
    if (!formData.toDate) newErrors.toDate = 'To date is required.';
    if (!formData.description) newErrors.description = 'Description is required.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      // Submit form data if there are no errors
      axios.post('http://localhost:8000/addLeave',formData)
      .then((result) => {
        console.log(result);
        navigate('/leave');
      })
      console.log(formData);

    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-20 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Request for Leave</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Leave Type</label>
          <select
            name="leaveType"
            value={formData.leaveType}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Earned Leave">Earned Leave</option>
          </select>
          {errors.leaveType && <p className="text-red-500 text-sm mt-1">{errors.leaveType}</p>}
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-1">From Date</label>
            <input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.fromDate && <p className="text-red-500 text-sm mt-1">{errors.fromDate}</p>}
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-1">To Date</label>
            <input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.toDate && <p className="text-red-500 text-sm mt-1">{errors.toDate}</p>}
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Reason"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 font-semibold"
        >
          Add Leave
        </button>
      </form>
    </div>
  );
};

export default AddLeave;
