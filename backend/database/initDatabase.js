import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import db from "../config/database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schema = fs.readFileSync(
  path.join(__dirname, "schema.sql"),
  "utf-8"
);

const seed = fs.readFileSync(
  path.join(__dirname, "seed.sql"),
  "utf-8"
);

db.exec(schema, (err) => {
  if (err) {
    console.error("Erro ao executar schema:", err.message);
    return;
  }

  console.log("✅ Schema executado.");

  db.exec(seed, (err) => {
    if (err) {
      console.error("Erro ao executar seed:", err.message);
      return;
    }

    console.log("✅ Seed executado.");
  });
});