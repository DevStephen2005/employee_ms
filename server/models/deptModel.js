const mongoose = require('mongoose')

const deptSchema =  new mongoose.Schema({
    departmentName : String,
    description: String,
})

const deptModel = mongoose.model('department',deptSchema)

module.exports = deptModel