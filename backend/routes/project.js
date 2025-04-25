import express from "express";
import { readFromDB, writeToDB } from "../utils/db.mjs";
import { nanoid } from "nanoid";

const router = express.Router();

// Project takes care of Employees
router.post("/", (req, res) => {
  const { name, description, employees = [] } = req.body;

  if (!name || !description)
    return res.status(400).json({ error: "Name and description are required" });

  const db = readFromDB();
  const projectId = nanoid(16);
  const timestamp = Date.now();

  const newProject = {
    id: projectId,
    name,
    description,
    employees,
    statuses: ["To do", "On hold", "In progress", "Done"],
    priorities: ["low", "medium", "high"],
    billable: true,
    archived: false,
    deadline: "",
    organizationId: "0",
    creatorId: "0",
    teams: [],
    payroll: {
      billRate: "",
      overtimeBillrate: "",
    },
    createdAt: timestamp,
  };

  db.projects.push(newProject);

  db.employees = db.employees.map((employee) => {
    if (employees.includes(employee.id))
      return {
        ...employee,
        projects: [...new Set([...employee.projects, projectId])],
      };

    return employee;
  });

  writeToDB(db);

  return res.status(201).json(newProject);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const db = readFromDB();

  const project = db.projects.find((project) => project.id === id);

  if (!project) return res.status(404).json({ error: "Project not found" });

  res.json(project);
});

router.get("/", (_, res) => {
  const db = readFromDB();
  res.json(db.projects);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, employees } = req.body;

  const db = readFromDB();
  const projectIndex = db.projects.findIndex((project) => project.id === id);

  if (projectIndex === -1)
    return res.status(404).json({ error: "Project not found" });

  const project = db.projects[projectIndex];

  if (name) project.name = name;
  if (description) project.description = description;
  if (Array.isArray(employees)) project.employees = employees;

  db.employees = db.employees.map((employee) => {
    if (employees?.includes(employee.id))
      return {
        ...employee,
        projects: [...new Set([...employee.projects, id])],
      };

    if (employee.projects.includes(id))
      return {
        ...employee,
        projects: employee.projects.filter((projectId) => projectId !== id),
      };

    return employee;
  });

  db.projects[projectIndex] = project;
  writeToDB(db);

  res.json(project);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const db = readFromDB();

  const projectIndex = db.projects.findIndex((project) => project.id === id);
  if (projectIndex === -1)
    return res.status(404).json({ error: "Project not found" });

  const deletedProject = db.projects[projectIndex];

  db.projects.splice(projectIndex, 1);

  db.employees = db.employees.map((employee) => ({
    ...employee,
    projects: employee.projects.filter((projectId) => projectId !== id),
  }));

  writeToDB(db);

  res.json({ success: true, deleted: deletedProject });
});

export default router;
