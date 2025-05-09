import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import { auth } from "../middleware/auth.js";

dotenv.config();

const router = express.Router();

const storage = multer.diskStorage({
  destination: (_req, _res, callback) => {
    callback(null, "uploads/");
  },
  filename: (_, file, callback) => {
    const uniqueName = `${Date.now()}-${file.originalname}.png`;
    callback(null, uniqueName);
  },
});

const upload = multer({ storage });

const BASE_UPLOAD_URL = process.env.UPLOAD_BASE_URL;

router.post("/", auth(), upload.single("screenshot"), (req, res) => {
  if (!req.file)
    return res.status(400).json({ error: "Screenshot file is required" });

  const link = `${BASE_UPLOAD_URL}/${req.file.filename}`;
  res.status(200).json({ link });
});

export default router;
