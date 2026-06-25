import produtosService from "../services/produtosService.js";

async function listarTodos(req, res) {
  try {
    const produtos = await produtosService.listarTodos();
    res.json(produtos);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

async function criar(req, res) {
  try {
    const produto = await produtosService.criar(req.body);
    res.status(201).json(produto);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
}

export default {
  listarTodos,
  criar,
};