import produtosRepository from "../repositories/produtosRepository.js";

async function listarTodos() {
  return await produtosRepository.listarTodos();
}

async function criar(dados) {
  if (!dados.nome) {
    throw new Error("O nome do produto é obrigatório.");
  }

  return await produtosRepository.criar(dados);
}

export default {
  listarTodos,
  criar,
};