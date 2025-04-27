import express from "express";
import { readFromDB, writeToDB } from "../utils/db.mjs";
import { nanoid } from "nanoid";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth(), (req, res) => {
  const {
    employeeId,
    projectId,
    taskId,
    link,
    timestamp,
    permissionGranted,
    fingerprint,
    ipAddress,
  } = req.body;

  if (!employeeId || !projectId || !link || !timestamp)
    return res.status(400).json({ error: "Missing required fields" });

  const db = readFromDB();

  const newScreenshot = {
    id: nanoid(16),
    type: "scheduled",
    employeeId,
    projectId,
    taskId: taskId || "",
    link,
    timestamp,
    timestampTranslated: timestamp,
    permissionGranted: !!permissionGranted,
    fingerprint: fingerprint || "",
    ipAddress,
    // hardcoded
    gateways: ["b0:ac:d2:54:71:6a"],
    timezoneOffset: 0,
    app: "Google Chrome",
    appFileName: "chrome.exe",
    appFilePath: "/usr/bin/google-chrome",
    title: "Working on task",
    url: "https://app.mercor.com",
    document: "",
    windowId: nanoid(12),
    shiftId: "",
    taskStatus: "in progress",
    taskPriority: "low",
    user: "mockuser",
    name: "Mock Employee",
    computer: "Mock Device",
    domain: "",
    hwid: "hwid-0000",
    os: "web",
    osVersion: "1.0",
    processed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    teamId: "0",
    sharedSettingsId: "0",
    organizationId: "0",
    appId: "mockapp",
    appLabelId: "mocklabel",
    categoryId: "",
    categoryLabelId: "",
    productivity: 1,
    site: "app.mercor.com",
    _index: "screenshots-demo-2025",
  };

  db.screenshots.push(newScreenshot);
  writeToDB(db);

  res.status(201).json(newScreenshot);
});

router.get("/", auth("admin"), (req, res) => {
  const { employeeId, projectId, start, end } = req.query;
  const db = readFromDB();

  let data = db.screenshots;

  if (employeeId)
    data = data.filter((screenshot) => screenshot.employeeId === employeeId);

  if (projectId)
    data = data.filter((screenshot) => screenshot.projectId === projectId);

  if (start)
    data = data.filter((screenshot) => screenshot.timestamp >= Number(start));

  if (end)
    data = data.filter((screenshot) => screenshot.timestamp <= Number(end));

  res.json(data);
});

router.delete("/:id", auth("admin"), (req, res) => {
  const { id } = req.params;
  const db = readFromDB();

  const screenshotIndex = db.screenshots.findIndex(
    (screenshot) => screenshot.id === id
  );
  if (screenshotIndex === -1)
    return res.status(404).json({ error: "Screenshot not found" });

  const deleted = db.screenshots.splice(screenshotIndex, 1)[0];
  writeToDB(db);

  res.json({ success: true, deleted });
});

export default router;
