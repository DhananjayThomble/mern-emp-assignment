const express = require("express");
const router = express.Router();
const Employee = require("../models/EmployeeModel");
const mongoose = require("mongoose");

// url: http://localhost:3000/employees

// get all employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// insert new employee
router.post("/", async (req, res) => {
  // generate unuique id for new employee using mongoose, convert to string
  const empId = new mongoose.Types.ObjectId().toString();
  // console.log(empId);
  const employee = new Employee({
    id: empId,
    name: req.body.name,
    address: req.body.address,
    age: req.body.age,
    department: req.body.department,
    status: req.body.status,
  });

  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// update employee by id
router.patch("/:id", getEmployee, async (req, res) => {
  if (req.body.name != null) {
    res.employee.name = req.body.name;
  }
  if (req.body.address != null) {
    res.employee.address = req.body.address;
  }
  if (req.body.age != null) {
    res.employee.age = req.body.age;
  }
  if (req.body.department != null) {
    res.employee.department = req.body.department;
  }
  if (req.body.status != null) {
    res.employee.status = req.body.status;
  }
  try {
    const updatedEmployee = await res.employee.save();
    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// getEmployee middleware
async function getEmployee(req, res, next) {
    console.log(req.params.id);
  let employee;
  try {
    employee = await Employee.findOne({ id: req.params.id });
    if (employee == null) {
      return res.status(404).json({ message: "Cannot find employee" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.employee = employee;
  next();
}

module.exports = router;