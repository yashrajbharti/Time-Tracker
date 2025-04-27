import express from "express";
import { readFromDB, writeToDB } from "../utils/db.mjs";
import { nanoid } from "nanoid";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// We added fingerprint and ip address here
router.post("/window", auth(), (req, res) => {
  const {
    employeeId,
    projectId,
    taskId,
    start,
    end,
    duration,
    fingerprint,
    ipAddress,
  } = req.body;

  if (!employeeId || !projectId || !taskId || !start || !end || !duration)
    return res.status(400).json({ error: "Missing required fields" });

  const db = readFromDB();
  const now = new Date().toISOString();

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

router.get("/window", auth(), (req, res) => {
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

router.post("/project-time", auth(), (req, res) => {
  const { employeeId, projectId, time, income } = req.body;

  if (!employeeId || !projectId || time === undefined || income === undefined)
    return res.status(400).json({ error: "Missing required fields" });

  const db = readFromDB();

  const existingEntry = db.analytics.find(
    (entry) => entry.id === employeeId && entry.projectId === projectId
  );

  if (existingEntry) {
    existingEntry.time = time;
    existingEntry.income = income;
  } else {
    const summary = {
      id: employeeId,
      projectId,
      time,
      costs: 0,
      income,
    };
    db.analytics.push(summary);
  }

  writeToDB(db);

  res.status(201).json({ success: true });
});

router.get("/project-time", auth(), (req, res) => {
  const { employeeId, projectId } = req.query;
  const db = readFromDB();

  let entries = db.analytics;

  if (employeeId) {
    entries = entries.filter((entry) => entry.id === employeeId);
  }

  if (projectId) {
    entries = entries.filter((entry) => entry.projectId === projectId);
  }

  res.json(entries);
});

export default router;
