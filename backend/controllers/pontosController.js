import pontosService from "../services/pontosService.js";

async function listarTodos(req, res) {
  try {
    const pontos = await pontosService.listarTodos();
    res.json(pontos);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

async function criar(req, res) {
  try {
    const ponto = await pontosService.criar(req.body);
    res.status(201).json(ponto);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
}

export default {
  listarTodos,
  criar,
};