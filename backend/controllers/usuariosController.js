import usuariosService from "../services/usuariosService.js";

async function listarTodos(req, res) {
  try {
    const usuarios = await usuariosService.listarTodos();
    res.json(usuarios);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

async function criar(req, res) {
  try {
    const usuario = await usuariosService.criar(req.body);
    res.status(201).json(usuario);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
}

export default {
  listarTodos,
  criar,
};