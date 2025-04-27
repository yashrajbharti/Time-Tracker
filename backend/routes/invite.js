import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { auth } from "../middleware/auth.js";
import { mailTemplate } from "../utils/mail.mjs";

dotenv.config();

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const FRONTEND_URL = process.env.FRONTEND_URL;

router.post("/send", auth("admin"), async (req, res) => {
  const { employeeId, projectId, email } = req.body;

  if (!employeeId || !projectId || !email) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const inviteLink = `${FRONTEND_URL}/login.html?employeeId=${employeeId}&projectId=${projectId}&email=${encodeURIComponent(
    email
  )}`;

  try {
    await transporter.sendMail(
      mailTemplate(process.env.MAIL_USER, inviteLink, email)
    );
    res.json({ success: true, message: "Invite sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

export default router;
