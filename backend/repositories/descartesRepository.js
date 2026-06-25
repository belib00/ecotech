import db from "../config/database.js";

function listarTodos() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM descartes", [], (erro, rows) => {
      if (erro) reject(erro);
      else resolve(rows);
    });
  });
}

function criar(descarte) {
  const { usuario_id, ponto_id, produto_id, status } = descarte;

  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO descartes (usuario_id, ponto_id, produto_id, status)
       VALUES (?, ?, ?, ?)`,
      [usuario_id, ponto_id, produto_id, status || "Pendente"],
      function (erro) {
        if (erro) reject(erro);
        else resolve({ id: this.lastID, ...descarte });
      }
    );
  });
}

export default {
  listarTodos,
  criar,
};