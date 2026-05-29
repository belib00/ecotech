import db from "../models/db.js";

export const listarUsuarios = (req, res) => {
  db.all("SELECT * FROM usuarios", [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        erro: err.message,
      });
    }

    res.json(rows);
  });
};

export const buscarUsuarioPorId = (req, res) => {
  const { id } = req.params;

  db.get(
    "SELECT * FROM usuarios WHERE id = ?",
    [id],
    (err, row) => {
      if (err) {
        return res.status(500).json({
          erro: err.message,
        });
      }

      if (!row) {
        return res.status(404).json({
          mensagem: "Usuário não encontrado",
        });
      }

      res.json(row);
    }
  );
};

export const criarUsuario = (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({
      mensagem: "Nome e email são obrigatórios",
    });
  }

  db.run(
    "INSERT INTO usuarios (nome, email) VALUES (?, ?)",
    [nome, email],
    function (err) {
      if (err) {
        return res.status(500).json({
          erro: err.message,
        });
      }

      res.status(201).json({
        id: this.lastID,
        nome,
        email,
      });
    }
  );
};

export const atualizarUsuario = (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;

  db.run(
    "UPDATE usuarios SET nome = ?, email = ? WHERE id = ?",
    [nome, email, id],
    function (err) {
      if (err) {
        return res.status(500).json({
          erro: err.message,
        });
      }

      res.json({
        mensagem: "Usuário atualizado com sucesso",
      });
    }
  );
};

export const deletarUsuario = (req, res) => {
  const { id } = req.params;

  db.run(
    "DELETE FROM usuarios WHERE id = ?",
    [id],
    function (err) {
      if (err) {
        return res.status(500).json({
          erro: err.message,
        });
      }

      res.json({
        mensagem: "Usuário removido com sucesso",
      });
    }
  );
};
