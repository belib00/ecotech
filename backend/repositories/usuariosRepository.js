import db from "../config/database.js";

function listarTodos() {
  return new Promise((resolve, reject) => {
    db.all("SELECT id, nome, email, telefone, cidade, foto, tipo, status, created_at FROM usuarios", [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function buscarPorId(id) {
  return new Promise((resolve, reject) => {
    db.get("SELECT id, nome, email, telefone, cidade, foto, tipo, status, created_at FROM usuarios WHERE id = ?", [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function buscarPorEmail(email) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM usuarios WHERE email = ?", [email], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function criar(usuario) {
  const { nome, email, senha, telefone, cidade, foto, tipo, status } = usuario;

  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO usuarios (nome, email, senha, telefone, cidade, foto, tipo, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [nome, email, senha, telefone, cidade, foto, tipo || "usuario", status || "ativo"],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, ...usuario });
      }
    );
  });
}

function atualizar(id, usuario) {
  const { nome, telefone, cidade, foto, tipo, status } = usuario;

  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE usuarios
       SET nome = ?, telefone = ?, cidade = ?, foto = ?, tipo = ?, status = ?
       WHERE id = ?`,
      [nome, telefone, cidade, foto, tipo, status, id],
      function (err) {
        if (err) reject(err);
        else resolve({ id, ...usuario });
      }
    );
  });
}

function remover(id) {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM usuarios WHERE id = ?", [id], function (err) {
      if (err) reject(err);
      else resolve({ removido: this.changes > 0 });
    });
  });
}

export default {
  listarTodos,
  buscarPorId,
  buscarPorEmail,
  criar,
  atualizar,
  remover,
};