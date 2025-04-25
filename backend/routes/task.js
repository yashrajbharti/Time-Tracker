import express from "express";
import { readFromDB, writeToDB } from "../utils/db.mjs";
import { nanoid } from "nanoid";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth("admin"), (req, res) => {
  const { name, description, employees, projectId } = req.body;

  if (!name || !projectId || !Array.isArray(employees))
    return res
      .status(400)
      .json({ error: "name, projectId, and employees are required" });

  const db = readFromDB();

  const projectExists = db.projects.find((project) => project.id === projectId);
  if (!projectExists)
    return res.status(404).json({ error: "Project not found" });

  const newTask = {
    id: nanoid(16),
    name,
    description,
    employees,
    projectId,
    status: "To Do",
    priority: "low",
    billable: true,
    creatorId: "0",
    organizationId: "0",
    teams: ["0"],
    payroll: {
      billRate: "",
      overtimeBillRate: "",
    },
    createdAt: Date.now(),
  };

  db.tasks.push(newTask);
  writeToDB(db);

  res.status(201).json(newTask);
});

router.get("/:id", auth(), (req, res) => {
  const { id } = req.params;
  const db = readFromDB();

  const task = db.tasks.find((t) => t.id === id);

  if (!task) return res.status(404).json({ error: "Task not found" });

  res.json(task);
});

router.get("/", auth(), (_, res) => {
  const db = readFromDB();
  res.json(db.tasks);
});

router.put("/:id", auth("admin"), (req, res) => {
  const { id } = req.params;
  const { name, description, employees } = req.body;

  const db = readFromDB();
  const taskIndex = db.tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1)
    return res.status(404).json({ error: "Task not found" });

  const task = db.tasks[taskIndex];

  if (name) task.name = name;
  if (description) task.description = description;
  if (Array.isArray(employees)) task.employees = employees;

  db.tasks[taskIndex] = task;
  writeToDB(db);

  res.json(task);
});

router.delete("/:id", auth("admin"), (req, res) => {
  const { id } = req.params;
  const db = readFromDB();

  const taskIndex = db.tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1)
    return res.status(404).json({ error: "Task not found" });

  const deletedTask = db.tasks.splice(taskIndex, 1)[0];
  writeToDB(db);

  res.json({ success: true, deleted: deletedTask });
});

export default router;
