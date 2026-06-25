import usuariosRepository from "../repositories/usuariosRepository.js";

async function listarTodos() {
  return await usuariosRepository.listarTodos();
}

async function criar(dados) {
  if (!dados.nome || !dados.email || !dados.senha) {
    throw new Error("Nome, email e senha são obrigatórios.");
  }

  return await usuariosRepository.criar(dados);
}

export default {
  listarTodos,
  criar,
};