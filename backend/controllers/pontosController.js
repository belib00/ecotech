import db from "../models/db.js";

export const listarPontos = (req, res) => {
  db.all("SELECT * FROM pontos", [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        erro: err.message,
      });
    }

    res.json(rows);
  });
};

export const criarPonto = (req, res) => {
  const { nome, endereco, tipo } = req.body;

  if (!nome || !endereco || !tipo) {
    return res.status(400).json({
      mensagem: "Todos os campos são obrigatórios",
    });
  }

  db.run(
    "INSERT INTO pontos (nome, endereco, tipo) VALUES (?, ?, ?)",
    [nome, endereco, tipo],
    function (err) {
      if (err) {
        return res.status(500).json({
          erro: err.message,
        });
      }

      res.status(201).json({
        id: this.lastID,
        nome,
        endereco,
        tipo,
      });
    }
  );
};

export const buscarPontoPorId = (req, res) => {
  const { id } = req.params;

  db.get(
    "SELECT * FROM pontos WHERE id = ?",
    [id],
    (err, row) => {
      if (err) {
        return res.status(500).json({
          erro: err.message,
        });
      }

      if (!row) {
        return res.status(404).json({
          mensagem: "Ponto não encontrado",
        });
      }

      res.json(row);
    }
  );
};

export const atualizarPonto = (req, res) => {
  const { id } = req.params;
  const { nome, endereco, tipo } = req.body;

  db.run(
    "UPDATE pontos SET nome = ?, endereco = ?, tipo = ? WHERE id = ?",
    [nome, endereco, tipo, id],
    function (err) {
      if (err) {
        return res.status(500).json({
          erro: err.message,
        });
      }

      res.json({
        mensagem: "Ponto atualizado com sucesso",
      });
    }
  );
};

export const deletarPonto = (req, res) => {
  const { id } = req.params;

  db.run(
    "DELETE FROM pontos WHERE id = ?",
    [id],
    function (err) {
      if (err) {
        return res.status(500).json({
          erro: err.message,
        });
      }

      res.json({
        mensagem: "Ponto removido com sucesso",
      });
    }
  );
};
