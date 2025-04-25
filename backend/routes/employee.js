import express from "express";
import { readFromDB, writeToDB } from "../utils/db.mjs";
import { nanoid } from "nanoid";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth("admin"), (req, res) => {
  const { name, email } = req.body;

  if (!name || !email)
    return res.status(400).json({ error: "Name and email are required" });

  const db = readFromDB();

  const exists = db.employees.find((employee) => employee.email === email);
  if (exists)
    return res
      .status(400)
      .json({ error: "Employee with this email already exists in the system" });

  const timestamp = Date.now();
  const newEmployee = {
    id: nanoid(16),
    name,
    email,
    teamId: "0",
    sharedSettingsId: "0",
    accountId: nanoid(16),
    identifier: email,
    type: "personal",
    organizationId: "0",
    projects: [],
    deactivated: 0,
    invited: 0,
    createdAt: timestamp,
  };

  db.employees.push(newEmployee);
  writeToDB(db);

  return res.status(201).json(newEmployee);
});

router.get("/:id", auth(), (req, res) => {
  const { id } = req.params;
  const db = readFromDB();

  const employee = db.employees.find((employee) => employee.id === id);

  if (!employee) return res.status(404).json({ error: "Employee not found" });

  return res.json(employee);
});

router.get("/", auth(), (req, res) => {
  const { select } = req.query;
  const db = readFromDB();

  let employees = db.employees;

  if (select) {
    const fields = select.split(",");

    employees = employees.map((employee) => {
      const selectedFields = {};
      fields.forEach((field) => {
        if (employee[field] !== undefined)
          selectedFields[field] = employee[field];
      });
      return selectedFields;
    });
  }

  return res.json(employees);
});

router.put("/:id", auth(), (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (
    req.user.role !== "admin" &&
    (req.user.role !== "employee" || req.user.employeeId !== id)
  ) {
    return res.status(403).json({ error: "Not authorized" });
  }

  const db = readFromDB();
  const employeeIndex = db.employees.findIndex(
    (employee) => employee.id === id
  );

  if (employeeIndex === -1)
    return res.status(404).json({ error: "Employee not found" });

  const existingEmployee = db.employees[employeeIndex];

  const updatedEmployee = {
    ...existingEmployee,
    ...updates,
  };

  db.employees[employeeIndex] = updatedEmployee;
  writeToDB(db);

  return res.json(updatedEmployee);
});

router.put("/deactivate/:id", auth(), (req, res) => {
  const { id } = req.params;
  const db = readFromDB();

  const employeeIndex = db.employees.findIndex(
    (employee) => employee.id === id
  );

  if (employeeIndex === -1)
    return res.status(404).json({ error: "Employee not found" });

  db.employees[employeeIndex].deactivated = Date.now();
  const updatedEmployee = db.employees[employeeIndex];

  writeToDB(db);

  return res.json(updatedEmployee);
});

export default router;
