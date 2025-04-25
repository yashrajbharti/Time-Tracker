import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { readDB, writeDB } from "../utils/db.js";

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/login", (req, res) => {
  const { employeeId, email } = req.body;
  const db = readDB();

  const employee = db.employees.find(
    (emp) => emp.id === employeeId && emp.email === email
  );

  if (!employee) {
    return res.status(401).json({ error: "Invalid employee credentials" });
  }

  if (employee.invited !== 0) {
    employee.invited = 0;
    writeDB(db);
  }

  const token = jwt.sign({ employeeId, role: "employee" }, JWT_SECRET, {
    expiresIn: "30d",
  });

  res.json({ token });
});

export default router;
