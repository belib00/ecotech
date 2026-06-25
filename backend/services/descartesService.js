import descartesRepository from "../repositories/descartesRepository.js";

async function listarTodos() {
  return await descartesRepository.listarTodos();
}

async function criar(dados) {
  return await descartesRepository.criar(dados);
}

export default {
  listarTodos,
  criar,
};