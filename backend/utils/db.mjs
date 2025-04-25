import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "../data/db.json");

export const readFromDB = () => {
  return JSON.parse(readFileSync(dbPath, "utf-8"));
};

export const writeToDB = (data) => {
  writeFileSync(dbPath, JSON.stringify(data, null, 2));
};
