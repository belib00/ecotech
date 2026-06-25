import db from "../models/db.js";

export const listarfeedbacks = (req, res) => {
  db.all("SELECT * FROM feedbacks", [], (err, rows) => {
    if (err) return
res.status(500).json({ erro: err.message });
    res.json(rows);
  });
};

export const criarfeedbacks = (req, res) => {
  const {usuarios_id, mensagem, nota } =
req.body;

  db.run(
    "INSERT INTO feedbacks (usuario_id, mensagem, nota) VALUES (?, ?, ?),
    [usuario_id, mensagem, nota],
    function (err) {
res.status(500).json {erro: err.message });
  
     res,status(201).json({
       id: this.lasrTD,
       usuario_id,
       mensagem,
       nota,
     });
   }
 );
};
