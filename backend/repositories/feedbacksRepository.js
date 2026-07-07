import db from "../config/database.js";

function listarTodos() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM feedbacks", [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function criar(dados) {
  return new Promise((resolve, reject) => {
    const { usuario_id, mensagem, nota } = dados;

    db.run(
      `INSERT INTO feedbacks (usuario_id, mensagem, nota)
       VALUES (?, ?, ?)`,
      [usuario_id, mensagem, nota],
      function (err) {
        if (err) reject(err);
        else {
          resolve({
            id: this.lastID,
            usuario_id,
            mensagem,
            nota,
          });
        }
      }
    );
  });
}

export default {
  listarTodos,
  criar,
};