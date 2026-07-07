import db from "../config/database.js";

function listarTodos() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM mensagens_contato", [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function criar(dados) {
  return new Promise((resolve, reject) => {
    const { nome, email, assunto, mensagem } = dados;

    db.run(
      `INSERT INTO mensagens_contato (nome, email, assunto, mensagem)
       VALUES (?, ?, ?, ?)`,
      [nome, email, assunto, mensagem],
      function (err) {
        if (err) reject(err);
        else {
          resolve({
            id: this.lastID,
            nome,
            email,
            assunto,
            mensagem,
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