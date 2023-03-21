const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },

  name: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
    required: true,
  },

  department: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    required: true,
  },

  latitude: {
    type: Number,
    required: true,
  },

  longitude: {
    type: Number,
    required: true,
  },
});

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
