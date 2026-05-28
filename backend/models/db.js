import sqlite3 from 'sqlite3';

const sqlite = sqlite3.verbose();

const db = new sqlite.Database('./backend/database/banco.db', (err) => {
    if (err) {
        console.log('Erro ao conectar:', err.message);
    } else {
        console.log('Banco conectado!');
    }
});

export default db;