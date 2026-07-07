-- Categorias
INSERT OR IGNORE INTO categorias (nome) VALUES
('Celular'),
('Notebook'),
('Televisão'),
('Geladeira'),
('Micro-ondas'),
('Computador'),
('Pilhas'),
('Baterias');

-- Pontos de coleta
INSERT OR IGNORE INTO pontos_coleta
(nome, endereco, cidade, latitude, longitude, horario, telefone)
VALUES
('Eco Ponto Centro',
 'Rua Central, 100',
 'Montenegro',
 -29.6815,
 -51.4619,
 '08:00 às 18:00',
 '(51) 99999-9999');