import db from "../config/database.js";

function listarTodos() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM pontos_coleta", [], (erro, rows) => {
      if (erro) reject(erro);
      else resolve(rows);
    });
  });
}

function criar(ponto) {
  const { nome, endereco, cidade, latitude, longitude, horario, telefone } = ponto;

  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO pontos_coleta 
      (nome, endereco, cidade, latitude, longitude, horario, telefone)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nome, endereco, cidade, latitude, longitude, horario, telefone],
      function (erro) {
        if (erro) reject(erro);
        else resolve({ id: this.lastID, ...ponto });
      }
    );
  });
}

export default {
  listarTodos,
  criar,
};