import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { readFromDB, writeToDB } from "../utils/db.mjs";

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/login", (req, res) => {
  const { employeeId, email, projectId } = req.body;
  const db = readFromDB();

  const employee = db.employees.find(
    (employee) => employee.id === employeeId && employee.email === email
  );

  const project = db.projects.find((project) => project.id === projectId);

  if (!project) return res.status(404).json({ error: "Project not found" });

  if (!employee)
    return res.status(401).json({ error: "Invalid employee credentials" });

  if (employee.invited !== 0) employee.invited = 0;

  if (employee.projects.indexOf(projectId) === -1)
    employee.projects.push(projectId);

  if (project.employees.indexOf(employeeId) === -1)
    project.employees.push(employeeId);

  writeToDB(db);

  const token = jwt.sign({ employeeId, role: "employee" }, JWT_SECRET, {
    expiresIn: "30d",
  });

  res.json({ token });
});

export default router;
