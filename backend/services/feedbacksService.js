import feedbacksRepository from "../repositories/feedbacksRepository.js";

async function listarTodos() {
  return await feedbacksRepository.listarTodos();
}

async function criar(dados) {
  if (!dados.mensagem) {
    throw new Error("A mensagem é obrigatória.");
  }

  return await feedbacksRepository.criar(dados);
}

export default {
  listarTodos,
  criar,
};