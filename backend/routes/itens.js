import express from 'express';
import db from '../models/db.js';

const router = express.Router();

router.get('/', (req, res) => {
    db.all('SELECT * FROM itens', [], (err, rows) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json(rows);
    });
});

router.post('/', (req, res) => {
    const { nome, categoria } = req.body;

    db.run(
        'INSERT INTO itens (nome, categoria) VALUES (?, ?)',
        [nome, categoria],
        function (err) {
            if (err) return res.status(500).json({ erro: err.message });

            res.json({
                id: this.lastID,
                nome,
                categoria
            });
        }
    );
});

export default router;