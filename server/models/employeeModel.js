const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Add this line

const employeeSchema = new mongoose.Schema({
    employeeId: { type: String, required: true, unique: true },
    name: { type: String, required: true }, // Added required for name
    dob: { type: Date },
    gender: { type: String },
    maritalStatus: { type: String },
    designation: { type: String },
    department: { type: String, ref: "Department", required: true },
    salary: { type: Number, required: true },
    role: { type: String },
    image: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Middleware to update `updatedAt` before saving
employeeSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const employeeModel = mongoose.model('employee', employeeSchema);

module.exports = employeeModel;
