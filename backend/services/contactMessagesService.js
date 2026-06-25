import contactMessagesRepository from "../repositories/contactMessagesRepository.js";

async function listarTodos() {
  return await contactMessagesRepository.listarTodos();
}

async function criar(dados) {
  if (!dados.nome || !dados.email || !dados.mensagem) {
    throw new Error("Nome, email e mensagem são obrigatórios.");
  }

  return await contactMessagesRepository.criar(dados);
}

export default {
  listarTodos,
  criar,
};