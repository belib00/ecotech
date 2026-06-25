import db from "../models/db.js";

export const listarItens = (req, res) => {
  db.all("SELECT * FROM itens", [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        erro: err.message,
      });
    }

    res.json(rows);
  });
};

export const buscarItemPorId = (req, res) => {
  const { id } = req.params;

  db.get(
    "SELECT * FROM itens WHERE id = ?",
    [id],
    (err, row) => {
      if (err) {
        return res.status(500).json({
          erro: err.message,
        });
      }

      if (!row) {
        return res.status(404).json({
          mensagem: "Item não encontrado",
        });
      }

      res.json(row);
    }
  );
};

export const criarItem = (req, res) => {
  const { nome, categoria } = req.body;

  db.run(
    "INSERT INTO itens (nome, categoria) VALUES (?, ?)",
    [nome, categoria],
    function (err) {
      if (err) {
        return res.status(500).json({
          erro: err.message,
        });
      }

      res.status(201).json({
        id: this.lastID,
        nome,
        categoria,
      });
    }
  );
};

export const atualizarItem = (req, res) => {
  const { id } = req.params;
  const { nome, categoria } = req.body;

  db.run(
    "UPDATE itens SET nome = ?, categoria = ? WHERE id = ?",
    [nome, categoria, id],
    function (err) {
      if (err) {
        return res.status(500).json({
          erro: err.message,
        });
      }

      res.json({
        mensagem: "Item atualizado com sucesso",
      });
    }
  );
};

export const deletarItem = (req, res) => {
  const { id } = req.params;

  db.run(
    "DELETE FROM itens WHERE id = ?",
    [id],
    function (err) {
      if (err) {
        return res.status(500).json({
          erro: err.message,
        });
      }

      res.json({
        mensagem: "Item removido com sucesso",
      });
    }
  );
};
