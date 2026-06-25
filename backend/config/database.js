import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

sqlite3.verbose();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const caminhoBanco = path.join(__dirname, "../database/banco.db");

const db = new sqlite3.Database(caminhoBanco, (erro) => {
  if (erro) {
    console.error("Erro ao conectar ao banco:", erro.message);
  } else {
    console.log("Banco de dados conectado.");
  }
});

export default db;