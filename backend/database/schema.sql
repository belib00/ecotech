PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL,
    telefone TEXT,
    cidade TEXT,
    foto TEXT,
    tipo TEXT DEFAULT 'usuario',
    status TEXT DEFAULT 'ativo',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categorias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    categoria_id INTEGER,
    estado TEXT,
    preco REAL,
    imagem TEXT,
    usuario_id INTEGER,
    disponivel INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(categoria_id) REFERENCES categorias(id),
    FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS pontos_coleta (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT,
    endereco TEXT NOT NULL,
    cidade TEXT,
    latitude REAL,
    longitude REAL,
    horario TEXT,
    telefone TEXT,
    descricao TEXT
);

CREATE TABLE IF NOT EXISTS descartes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER,
    ponto_id INTEGER,
    produto_id INTEGER,
    status TEXT DEFAULT 'Pendente',
    data DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY(ponto_id) REFERENCES pontos_coleta(id),
    FOREIGN KEY(produto_id) REFERENCES produtos(id)
);

CREATE TABLE IF NOT EXISTS feedbacks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER,
    mensagem TEXT,
    nota INTEGER,
    titulo TEXT,
    nota INTEGER CHECK(nota >=1 AND nota <=5)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS mensagens_contato (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT,
    assunto TEXT,
    mensagem TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);