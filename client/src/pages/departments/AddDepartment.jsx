import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddDepartment = () => {
  const [departmentName, setDepartmentName] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();
  
  const handleAddDepartment = () => {
    axios.post('http://localhost:8000/addDept', { departmentName, description })
      .then(result => {
        console.log(result);
        navigate('/department');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded-md border border-black">
      <h2 className="text-2xl font-bold text-center mb-6">Add New Department</h2>
      
      <div className="mb-4">
        <label htmlFor="departmentName" className="block text-black font-semibold mb-2 ">Department Name</label>
        <input
          type="text"
          id="departmentName"
          placeholder="Enter the Department Name"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
          className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="description" className="block text-black font-semibold mb-2">Description</label>
        <textarea
          id="description"
          placeholder="Enter the Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
        />
      </div>

      <button
        onClick={handleAddDepartment}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
      >
        Add Department
      </button>
    </div>
  );
};

export default AddDepartment;
