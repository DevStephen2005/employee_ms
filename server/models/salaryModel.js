const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
  department: { type: String, required: true },
  name: { type: String, required: true },
  basicSalary: { type: Number, required: true, min: 0 },
  allowances: { type: Number, default: 0, min: 0 },
  deductions: { type: Number, default: 0, min: 0 },
  payDate: { type: Date, required: true },
});

 salaryModel = mongoose.model('Salary', salarySchema);

 module.exports = salaryModel