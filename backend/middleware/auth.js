import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.JWT_SECRET;

export const auth = (requiredRole = "employee") => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Missing token" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, secret);

      if (decoded.role === "admin") {
        req.user = decoded;
        return next();
      }

      if (requiredRole === "employee" && decoded.role === "employee") {
        req.user = decoded;
        return next();
      }

      return res.status(403).json({ error: "Forbidden" });
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  };
};
