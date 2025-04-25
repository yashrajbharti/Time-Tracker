import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { auth } from "../middleware/auth.js";

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

  const inviteLink = `${FRONTEND_URL}/accept?employeeId=${employeeId}&projectId=${projectId}&email=${encodeURIComponent(
    email
  )}`;

  const mailOptions = {
    from: `"Contracts @ Mercor" <${process.env.MAIL_USER}>`,
    to: email,
    subject: "You're Invited to Join a Project 🚀",
    html: `
      <h1>Hello there!</h1>
      <p>You have been invited to join a project. Please click the button below to accept the invitation:</p>
      <p><a href="${inviteLink}" style="cursor: pointer; font-weight: 600; padding: 15px 45px; background-color: #212121; color: #F3F3F3; border: none; border-radius: 10px; font-size: 16px; text-decoration: none;">Accept Invitation</a></p>
      <p>If the button doesn't work, you can also copy and paste this URL into your browser:</p>
      <p>${inviteLink}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Invite sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

export default router;
