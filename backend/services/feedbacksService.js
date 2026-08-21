import feedbacksRepository from "../repositories/feedbacksRepository.js";

async function listarTodos() {
  return await feedbacksRepository.listarTodos();
}

async function criar(dados) {
  if (!dados.mensagem) {
    throw new Error("A mensagem é obrigatória.");
  }

  if (dados.nota !== undefined && dados.nota !== null && (dados.nota < 1 || dados.nota > 5)) {
    throw new Error("A nota deve estar entre 1 e 5.");
  }

  return await feedbacksRepository.criar(dados);
}

export default {
  listarTodos,
  criar,
};