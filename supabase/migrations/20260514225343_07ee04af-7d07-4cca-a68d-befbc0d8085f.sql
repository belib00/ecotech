CREATE TABLE public.contact_messages (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.pontos (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    endereco TEXT NOT NULL,
    telefone TEXT,
    horario TEXT,
    latitude REAL,
    longitude REAL,
    descricao TEXT
);

CREATE TABLE public.itens (
    id SERIAL PRIMARY KEY, -- Corrigido: SERIAL em vez de AUTOINCREMENT
    nome TEXT NOT NULL,
    categoria TEXT NOT NULL,
    descricao TEXT,
    pontos_aceitos TEXT
); 

CREATE TABLE public.usuarios (
    id SERIAL PRIMARY KEY, -- Corrigido: SERIAL em vez de AUTOINCREMENT
    nome TEXT NOT NULL, 
    email TEXT NOT NULL UNIQUE,
    telefone TEXT,
    cidade TEXT
); 

CREATE TABLE public.descartes (
    id SERIAL PRIMARY KEY, -- Corrigido: SERIAL em vez de AUTOINCREMENT
    usuario_id INTEGER,
    item_id INTEGER,
    ponto_id INTEGER,
    data_descarte DATE DEFAULT CURRENT_DATE -- Adicionado padrão para hoje se não enviado
); 

CREATE TABLE public.feedbacks (
    id SERIAL PRIMARY KEY, -- Corrigido: SERIAL em vez de AUTOINCREMENT
    usuario_id INTEGER,
    mensagem TEXT NOT NULL,
    nota INTEGER,
    data_feedback DATE DEFAULT CURRENT_DATE
); 

-- Habilitando Segurança de Linha (RLS) para a tabela de contatos
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Política de segurança para a tabela de contatos
CREATE POLICY "Anyone can submit a contact message"
ON public.contact_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
