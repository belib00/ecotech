import contactMessagesService from "../services/contactMessagesService.js";

async function listarTodos(req, res) {
  try {
    const mensagens = await contactMessagesService.listarTodos();
    res.json(mensagens);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

async function criar(req, res) {
  try {
    const mensagem = await contactMessagesService.criar(req.body);
    res.status(201).json(mensagem);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
}

export default {
  listarTodos,
  criar,
};
