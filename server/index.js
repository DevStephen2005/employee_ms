const express = require('express')
const app = express()
const multer = require('multer')
const cors = require('cors')
const path = require('path');
const bodyParser = require('body-parser');

const mongoose = require('mongoose')
const userModel = require('./models/usermodel') 
const deptModel = require('./models/deptModel') 
const employeeModel = require('./models/employeeModel')
const salaryModel = require('./models/salaryModel') 



const connectDB = require('./db/db')

const authRouter = require('./routes/auth')


// Middlewares 
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

app.use(express.static('public'))
// app.use('/uploads', express.static('uploads')); 

// DB CONNECTION 
connectDB()


// <-- AUTHENTICATION LOGIC  --> 

// Creating User 
app.post('/signup',(req,res) => {
    userModel.create(req.body)
    .then((result) => res.json(result))
    .catch(err => res.json(err))
})

// Login validation 

app.post('/login',(req,res) => {
    const {email,password} = req.body
    userModel.findOne({email:email})
    .then(user => {
        if(user){
            if(user.password === password)
                res.json('success')
            else
                res.json('password incorrect')
        }
        else{
            res.json('no record exists ')
        }
    })
    .catch(err => res.json(err))
})
    // <-- Department Data --> 


// ADD DEPT DATA 
app.post("/addDept",(req,res) => {
    deptModel.create(req.body)
    .then((result) => res.json(result))
    .catch(err => res.json(err))
})

// Retrieve DEPT Data 
app.get("/",(req,res) => {
    deptModel.find({})
    .then((result) => res.json(result))
    .catch(err => res.json(err))
})

// Delete DEPT Data 
app.delete("/deleteDept/:id",(req,res) => {
    const {id} = req.params
    deptModel.findByIdAndDelete({_id:id})
    .then((result) => res.json(result))
    .catch(err => res.json(err))
})

// retrieve Updated DEPT Data 
app.get("/getDept/:id",(req,res) => {
    const {id} = req.params
    deptModel.findById({_id:id})
    .then((result) => res.json(result))
    .catch(err => res.json(err))
})

// Update DEPT Data 
app.put("/updateDept/:id", (req, res) => {
    const {id} = req.params
    deptModel.findByIdAndUpdate(
        id,
        {
            departmentName: req.body.departmentName,
            description: req.body.description
        },
        { new: true } // Return the updated document
    )
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

    // <-- Employee Data --> 

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, "public/uploads")
        },
        filename: (req, file, cb) => {
          cb(null, Date.now() + path.extname(file.originalname))
        }
      })

    const uploads = multer({storage: storage}) 
      

// Handle the add employee route

app.post('/addEmp',uploads.single('file'), (req, res) => {
    const employeeData = req.body;
  
    // Add the image filename to employee data if a file was uploaded
    if (req.file) {
      employeeData.image = req.file.filename;
    }
  
    employeeModel.create(employeeData)
      .then((result) => res.json(result))
      .catch((err) => {
        console.error('Error saving employee:', err);
        res.status(500).json({ error: 'Failed to add employee' });
      });
  });

  // Retrieve Employee Data 
app.get("/getEmp",(req,res) => {
    employeeModel.find()
    .then((result) => res.json(result))
    .catch(err => res.json(err))
})

// Delete Employee Data 
app.delete("/deleteEmp/:id",(req,res) => {
    const {id} = req.params
    employeeModel.findByIdAndDelete({_id:id})
    .then((result) => res.json(result))
    .catch(err => res.json(err))
})

// retrieve Updated Emp Data 
app.get("/getEmp/:id",(req,res) => {
    const {id} = req.params
    employeeModel.findById({_id:id})
    .then((result) => res.json(result))
    .catch(err => res.json(err))
})

// Update Employee Data
app.put('/updateEmp/:id',(req, res) => {
    const { id } = req.params;
  
    const updateData = {
      name: req.body.name,
      maritalStatus: req.body.maritalStatus,
      designation: req.body.designation,
      department: req.body.department,
      salary: req.body.salary,
      role: req.body.role,
      updatedAt: Date.now(), // Update timestamp
    };
  
    employeeModel.findByIdAndUpdate(id,updateData)
    .then((result) => res.json(result))
    .catch(err => res.json(err))
  });

    // <-- salary Data --> 

  // Handle the add Salary route

app.post('/addSalary',(req, res) => {
  
    salaryModel.create(req.body)gi
    .then((result) => res.json(result))
    .catch(err => res.json(err))
  });

app.listen(process.env.PORT,() => {console.log(`Server running in the port ${process.env.PORT} `)})



