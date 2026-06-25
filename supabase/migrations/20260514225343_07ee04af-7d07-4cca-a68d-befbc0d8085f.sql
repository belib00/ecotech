CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE pontos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  endereco TEXT NOT NULL,
  telefone TEXT,
  horario TEXT,
  lagitude REAL, 
  longitude REAL,
  descricao TEXT,
 ); 

CREATE TABLE itens (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  categoria TEXT NOT NULL,
  descricao TEXT,
  pontos_aceitos TEXT
 ); 

CREATE TABLE usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL, 
  email TEXT NOT NULL,
  telefone TEXT,
  cidade TEXT
 ); 

CREATE TABLE descartes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  usuario_id INTERGER,
  item_id INTEGER,
  ponto_id INTEGER,
  data_descarte DATE
 ); 

 CREATE TABLE feedbacks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  usuario_id INTERGER,
  mensagem TEXT NOT NULL,
  nota INTEGER,
  data_feedback DATA DEFAULT CURRENT_DATE
 ); 

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a contact message"
ON public.contact_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
