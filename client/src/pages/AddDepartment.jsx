import  {  useState } from 'react';
import '../css/addDepartment.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddDepartment = () => {
  const [departmentName, setDepartmentName] = useState();
  const [description, setDescription] = useState();

  const navigate = useNavigate()
  

  const handleAddDepartment = () => {
    // Logic to add department (e.g., API call)
    axios.post('http://localhost:8000/addDept',{departmentName,description})
    .then(result => {
        console.log(result)
        navigate('/department')

      })
      .catch(err => console.log(err)
      )

  };

  return (
    <div className="add-department-container">
      <h2>Add New Department</h2>
      <div className="form-group">
        <label htmlFor="departmentName">Department Name</label>
        <input
          type="text"
          id="departmentName"
          placeholder="Enter the Department Name"
          onChange={(e) => setDepartmentName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="Enter the Description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button className="add-button" onClick={handleAddDepartment}>
        Add Department
      </button>
    </div>
  );
};

export default AddDepartment;
