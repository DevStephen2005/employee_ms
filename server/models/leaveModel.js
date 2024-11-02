const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  leaveType: {
    type: String,
    required: true,
    enum: ['Sick Leave', 'Casual Leave', 'Earned Leave'] // You can adjust these options as needed
  },
  fromDate: {
    type: Date,
    required: true
  },
  toDate: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500 // Optional: set a maximum length for the description
  },
  appliedDate: {
    type: Date,
    default: Date.now // Automatically set the applied date to the current date
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  }
});


const leaveModel = mongoose.model('Leave', leaveSchema);

module.exports = leaveModel