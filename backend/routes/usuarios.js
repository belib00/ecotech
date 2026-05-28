import express from 'express';
import db from '../models/db.js';

const router = express.Router();

router.get('/', (req, res) => {
    db.all('SELECT * FROM usuarios', [], (err, rows) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json(rows);
    });
});

router.post('/', (req, res) => {
    const { nome, email } = req.body;

    db.run(
        'INSERT INTO usuarios (nome, email) VALUES (?, ?)',
        [nome, email],
        function (err) {
            if (err) return res.status(500).json({ erro: err.message });

            res.json({
                id: this.lastID,
                nome,
                email
            });
        }
    );
});

export default router;