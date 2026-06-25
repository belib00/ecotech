import pontosRepository from "../repositories/pontosRepository.js";

async function listarTodos() {
  return await pontosRepository.listarTodos();
}

async function criar(dados) {
  if (!dados.nome || !dados.endereco) {
    throw new Error("Nome e endereço são obrigatórios.");
  }

  return await pontosRepository.criar(dados);
}

export default {
  listarTodos,
  criar,
};