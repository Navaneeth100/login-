const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    email: String,
    password: String
});

const StudentModel = mongoose.model("users", StudentSchema);

module.exports = StudentModel; // Corrected the export statement
