import express from 'express';
import db from '../models/db.js';

const router = express.Router();

router.get('/', (req, res) => {
    db.all('SELECT * FROM pontos', [], (err, rows) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json(rows);
    });
});

router.post('/', (req, res) => {
    const { nome, endereco, tipo } = req.body;

    db.run(
        'INSERT INTO pontos (nome, endereco, tipo) VALUES (?, ?, ?)',
        [nome, endereco, tipo],
        function (err) {
            if (err) return res.status(500).json({ erro: err.message });

            res.json({
                id: this.lastID,
                nome,
                endereco,
                tipo
            });
        }
    );
});

export default router;