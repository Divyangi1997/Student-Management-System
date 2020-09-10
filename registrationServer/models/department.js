var mongoose = require('mongoose')
var User = require('./user');

var deptSchema = new mongoose.Schema({
    rollno: { type: Number, ref: 'User', required: true },
    department: { type: String }
})

module.exports = mongoose.model('Department', deptSchema);