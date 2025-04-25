import express from "express";
import { readFromDB, writeToDB } from "../utils/db.mjs";
import { nanoid } from "nanoid";

const router = express.Router();

// We added fingerprint and ip address here
router.post("/window", (req, res) => {
  const { employeeId, projectId, taskId, start, end, duration, fingerprint } =
    req.body;

  if (!employeeId || !projectId || !taskId || !start || !end || !duration)
    return res.status(400).json({ error: "Missing required fields" });

  const db = readFromDB();
  const now = new Date().toISOString();
  const ipAddress = req.headers["x-forwarded-for"];

  const newLog = {
    id: nanoid(16),
    employeeId,
    projectId,
    taskId,
    start,
    end,
    startTranslated: start,
    endTranslated: end,
    duration,
    fingerprint: fingerprint || "",
    ipAddress,
    type: "manual",
    note: "",
    billable: true,
    paid: false,
    billRate: 0,
    overtimeBillRate: 0,
    payRate: 0,
    overtimePayRate: 0,
    taskStatus: "in progress",
    taskPriority: "low",
    teamId: "0",
    organizationId: "0",
    sharedSettingsId: "0",
    shiftId: "",
    timezoneOffset: 0,
    deletedScreenshots: 0,
    negativeTime: 0,
    createdAt: now,
    updatedAt: now,
  };

  db.timelogs.push(newLog);
  writeToDB(db);

  res.status(201).json(newLog);
});

router.get("/window", (req, res) => {
  const { start, end, employeeId, projectId, taskId } = req.query;
  const db = readFromDB();

  let logs = db.timelogs;

  if (start) logs = logs.filter((log) => log.start >= Number(start));

  if (end) logs = logs.filter((log) => log.end <= Number(end));

  if (employeeId) logs = logs.filter((log) => log.employeeId === employeeId);

  if (projectId) logs = logs.filter((log) => log.projectId === projectId);

  if (taskId) logs = logs.filter((log) => log.taskId === taskId);

  res.json(logs);
});

router.post("/project-time", (req, res) => {
  const { employeeId, time, income } = req.body;

  if (!employeeId || time === undefined || income === undefined)
    return res.status(400).json({ error: "Missing required fields" });

  const db = readFromDB();

  const summary = {
    id: employeeId,
    time,
    costs: 0,
    income,
  };

  db.analytics.push(summary);
  writeToDB(db);

  res.status(201).json(summary);
});

router.get("/project-time", (req, res) => {
  const { employeeId } = req.query;
  const db = readFromDB();

  let entries = db.analytics;

  if (employeeId) entries = entries.filter((entry) => entry.id === employeeId);

  res.json(entries);
});

export default router;
