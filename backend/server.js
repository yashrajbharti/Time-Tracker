import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import employeeRoutes from "./routes/employee.js";
import projectRoutes from "./routes/project.js";
import taskRoutes from "./routes/task.js";
import timelogRoutes from "./routes/timelog.js";
import screenshotRoutes from "./routes/screenshot.js";
import uploadRoutes from "./routes/upload.js";
import adminAuthRoutes from "./routes/admin.js";
import userAuthRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";
import inviteRoutes from "./routes/invite.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use("/employee", employeeRoutes);
app.use("/project", projectRoutes);
app.use("/task", taskRoutes);
app.use("/analytics", timelogRoutes);
app.use("/screenshot", screenshotRoutes);
app.use("/user", userAuthRoutes);
app.use("/admin", adminAuthRoutes);
app.use("/auth", authRoutes);
app.use("/invite", inviteRoutes);
app.use("/upload", uploadRoutes);
app.use("/uploads", express.static("uploads"));

app.get("/", (_, res) => res.send("Backend is running on Express"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
