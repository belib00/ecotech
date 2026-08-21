import usuariosRepository from "../repositories/usuariosRepository.js";

async function listarTodos() {
  return await usuariosRepository.listarTodos();
}

async function buscarPorId(id) {
  return await usuariosRepository.buscarPorId(id);
}

async function criar(dados) {
  const { nome, email, senha, telefone, cidade, foto } = dados;

  if (!nome || !email || !senha) {
    throw new Error("Nome, email e senha são obrigatórios.");
  }

  const usuarioExistente = await usuariosRepository.buscarPorEmail(email);

  if (usuarioExistente) {
    throw new Error("E-mail já cadastrado.");
  }

  return await usuariosRepository.criar({
    nome,
    email,
    senha,
    telefone,
    cidade,
    foto,
    tipo: "usuario",
    status: "ativo",
  });
}

async function atualizar(id, dados) {
  const usuario = await usuariosRepository.buscarPorId(id);

  if (!usuario) {
    return null;
  }

  return await usuariosRepository.atualizar(id, dados);
}

async function deletar(id) {
  return await usuariosRepository.remover(id);
}

export default {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar,
};