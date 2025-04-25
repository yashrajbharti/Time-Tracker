import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { readFromDB, writeToDB } from "../utils/db.mjs";

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/login", (req, res) => {
  const { employeeId, email } = req.body;
  // to do: add project id to employee projects: []
  const db = readFromDB();

  const employee = db.employees.find(
    (employee) => employee.id === employeeId && employee.email === email
  );

  if (!employee)
    return res.status(401).json({ error: "Invalid employee credentials" });

  if (employee.invited !== 0) {
    employee.invited = 0;
    writeToDB(db);
  }

  const token = jwt.sign({ employeeId, role: "employee" }, JWT_SECRET, {
    expiresIn: "30d",
  });

  res.json({ token });
});

export default router;
