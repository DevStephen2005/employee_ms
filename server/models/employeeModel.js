const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    employeeId: { type: String, required: true, unique: true },
    name: { type: String },
    dob: { type: Date },
    gender: { type: String },
    maritalStatus: { type: String },
    designation: { type: String },
    department: { type: String, ref: "Department", required: true },
    salary: { type: Number, required: true },
    role: {type: String, required: true},
    image: {type: String},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  

const employeeModel = mongoose.model('employee',employeeSchema)

module.exports = employeeModel