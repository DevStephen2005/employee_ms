import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateDept = () => {
  const [departmentName, setDepartmentName] = useState('');
  const [description, setDescription] = useState('');
  
  const navigate = useNavigate();
  const { id } = useParams();

  // Retrieve Updated Department Data.
  useEffect(() => {
    axios.get(`http://localhost:8000/getDept/${id}`)
      .then(result => {
        setDepartmentName(result.data.departmentName);
        setDescription(result.data.description);
        console.log(result);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleUpdateDepartment = (event) => {
    event.preventDefault();

    // Logic to update department (e.g., API call)
    axios.put(`http://localhost:8000/updateDept/${id}`, { departmentName, description })
      .then(result => {
        console.log(result);
        navigate('/department');
      })
      .catch(err => console.log(err));

    console.log('Department Name:', departmentName);
    console.log('Description:', description);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-5 border border-black rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-5">Update Department</h2>
      <form onSubmit={handleUpdateDepartment}>
        <div className="mb-4">
          <label htmlFor="departmentName" className="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
          <input
            type="text"
            id="departmentName"
            name='departmentName'
            value={departmentName}
            placeholder="Enter the Department Name"
            onChange={(e) => setDepartmentName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            id="description"
            name='description'
            value={description}
            placeholder="Enter the Description"
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200 font-semibold"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default UpdateDept;
