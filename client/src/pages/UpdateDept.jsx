import  { useEffect, useState } from 'react';
import '../css/addDepartment.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateDept = () => {
  const [departmentName, setDepartmentName] = useState();
  const [description, setDescription] = useState();

  const navigate = useNavigate()
    //   Destructute the id . 
    const {id} = useParams()

    // Retreive Updated Department Data. 
  useEffect(() => {
    axios.get("http://localhost:8000/getDept/"+id)
    .then(result => {
        setDepartmentName(result.data.departmentName)
        setDescription(result.data.description)

        console.log(result)
      })
      .catch(err => console.log(err)
      )
},[])

  const handleUpdateDepartment = (event) => {
    event.preventDefault()

    // Logic to add department (e.g., API call)
    axios.put('http://localhost:8000/updateDept/'+id,{departmentName,description})
    .then(result => {
        console.log(result)
        navigate('/department')

      })
      .catch(err => console.log(err)
      )

    console.log('Department Name:', departmentName);
    console.log('Description:', description);
  };

  return (
    <div className="add-department-container">
      <h2>Update Department</h2>
      <div className="form-group">
        <label htmlFor="departmentName">Department Name</label>
        <input
          type="text"
          id="departmentName"
          name='departmentName'
          value={departmentName}
          placeholder="Enter the Department Name"
          onChange={(e) => setDepartmentName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name='description'
          value={description}
          placeholder="Enter the Description"
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button className="add-button" onClick={handleUpdateDepartment}>
        Save
      </button>
    </div>
  );
};

export default UpdateDept;
