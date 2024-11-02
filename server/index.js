const express = require("express");
const app = express();
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const moment = require('moment');
// Models
const mongoose = require("mongoose");
const userModel = require("./models/usermodel");
const deptModel = require("./models/deptModel");
const employeeModel = require("./models/employeeModel");
const salaryModel = require("./models/salaryModel");
const leaveModel = require("./models/leaveModel");


const connectDB = require("./db/db");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use(express.static("public"));
// app.use('/uploads', express.static('uploads'));

// DB CONNECTION
connectDB();

// <-- AUTHENTICATION LOGIC  -->

// Creating User
app.post("/signup", (req, res) => {
  userModel
    .create(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// Login validation
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  userModel
    .findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          // Send a success response with user data
          res.json({
            success: true,
            message: "Login successful",
            user: {
              _id: user._id,
              email: user.email,
            }
          });
        } else {
          // Password incorrect
          res.json({
            success: false,
            message: "Password incorrect"
          });
        }
      } else {
        // User not found
        res.json({
          success: false,
          message: "User not found"
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "An error occurred during login",
        error: err.message
      });
    });
});



// <-- Department Data -->

// ADD DEPT DATA
app.post("/addDept", (req, res) => {
  deptModel
    .create(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// Retrieve DEPT Data
app.get("/", (req, res) => {
  deptModel
    .find({})
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// Delete DEPT Data
app.delete("/deleteDept/:id", (req, res) => {
  const { id } = req.params;
  deptModel
    .findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// retrieve Updated DEPT Data
app.get("/getDept/:id", (req, res) => {
  const { id } = req.params;
  deptModel
    .findById({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// Update DEPT Data
app.put("/updateDept/:id", (req, res) => {
  const { id } = req.params;
  deptModel
    .findByIdAndUpdate(
      id,
      {
        departmentName: req.body.departmentName,
        description: req.body.description,
      },
      { new: true } // Return the updated document
    )
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// <-- Employee Data -->

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploads = multer({ storage: storage });

// Handle the add employee route

app.post("/addEmp", uploads.single("file"), async (req, res) => {
    try {
        const employeeData = req.body;

        // Handle file upload
        if (req.file) {
            employeeData.image = req.file.filename;
        }

        // Create the employee document
        const employee = await employeeModel.create(employeeData);

        res.json(employee);
    } catch (err) {
        console.error("Error saving employee:", err);
        res.status(500).json({ error: "Failed to add employee" });
    }
});


// Retrieve Employee Data
app.get("/getEmp", (req, res) => {
  employeeModel
    .find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// Retrieve Employee Data
app.get("/viewEmp/:id", (req, res) => {
  const { id } = req.params;
  employeeModel
    .findById({_id:id})
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});


// Delete Employee Data
app.delete("/deleteEmp/:id", (req, res) => {
  const { id } = req.params;
  employeeModel
    .findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// retrieve Updated Emp Data
app.get("/getEmp/:id", (req, res) => {
  const { id } = req.params;
  employeeModel
    .findById({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// Update Employee Data
app.put("/updateEmp/:id", (req, res) => {
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

  employeeModel
    .findByIdAndUpdate(id, updateData)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// <-- salary Data -->

// Handle the add Salary route

app.post("/addSalary", (req, res) => {
  salaryModel
    .create(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});


// Retrieve salary Data
app.get("/getSalary", (req, res) => {
  salaryModel
    .find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// retrieve updated salary Data
app.get("/getSalary/:id", (req, res) => {
  const { id } = req.params;
  salaryModel
    .findById({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});


// Update salary Data
app.put("/updateSalary/:id", (req, res) => {
  const { id } = req.params;

  const updateData = {
    name: req.body.name,
    department: req.body.department,
    basicSalary: req.body.basicSalary,
    allowances: req.body.allowances,
    deductions: req.body.deductions,
    payDate: req.body.payDate,
    updatedAt: Date.now(), // Update timestamp
  };

  salaryModel
    .findByIdAndUpdate(id, updateData)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// Delete Employee Data
app.delete("/deleteSalary/:id", (req, res) => {
  const { id } = req.params;
  salaryModel
    .findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// <-- Leave Data -->

// Add Leave route
app.post("/addLeave", (req, res) => {
  leaveModel
    .create(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// Retrieve Leave Data
app.get("/getLeave", (req, res) => {
  leaveModel
    .find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// Update Paassword Data
app.put("/updatePassword", (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  // Validate the passwords
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  const updateData = {
    password: newPassword,
    updatedAt: Date.now(), // Update timestamp
  };

  userModel
    .findOneAndUpdate({ email: email }, updateData, { new: true }) // Use email to find the user
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(result);
    })
    .catch((err) => res.status(500).json(err)); // Send a 500 status for server errors
});


// Dashboard endpoint
app.get('/adminDashboard', async (req, res) => {
  try {
    const totalEmployees = await employeeModel.countDocuments();
    const totalDepartments = await deptModel.countDocuments();
    const monthlyPay = await employeeModel.aggregate([{ $group: { _id: null, totalSalary: { $sum: '$salary' } } }]);

    const leaveApplied = await leaveModel.countDocuments({ status: 'applied' });
    const leaveApproved = await leaveModel.countDocuments({ status: 'approved' });
    const leavePending = await leaveModel.countDocuments({ status: 'pending' });
    const leaveRejected = await leaveModel.countDocuments({ status: 'rejected' });

    res.json({
      totalEmployees,
      totalDepartments,
      monthlyPay: monthlyPay[0]?.totalSalary || 0,
      leaveDetails: {
        applied: leaveApplied,
        approved: leaveApproved,
        pending: leavePending,
        rejected: leaveRejected,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.listen(process.env.PORT, () => {
  console.log(`Server running in the port ${process.env.PORT} `);
});
