import descartesService from "../services/descartesService.js";

async function listarTodos(req, res) {
  try {
    const descartes = await descartesService.listarTodos();
    res.json(descartes);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

async function criar(req, res) {
  try {
    const descarte = await descartesService.criar(req.body);
    res.status(201).json(descarte);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
}

export default {
  listarTodos,
  criar,
};