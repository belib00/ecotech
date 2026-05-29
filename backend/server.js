import express from "express";
import cors from "cors";
import db from "./models/db.js";

import usuariosRoutes from "./routes/usuarios.js";
import pontosRoutes from "./routes/pontos.js";
import itensRoutes from "./routes/itens.js";

const app = express();

app.use(cors());
app.use(express.json());

db.run(`
CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  email TEXT NOT NULL
)
`);

db.run(`
CREATE TABLE IF NOT EXISTS pontos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  endereco TEXT NOT NULL,
  tipo TEXT NOT NULL
)
`);

db.run(`
CREATE TABLE IF NOT EXISTS itens (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  categoria TEXT NOT NULL
)
`);

app.use("/usuarios", usuariosRoutes);
app.use("/pontos", pontosRoutes);
app.use("/itens", itensRoutes);

app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
