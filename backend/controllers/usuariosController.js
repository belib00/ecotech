import usuariosService from "../services/usuariosService.js";

async function listarTodos(req, res) {
  try {
    const usuarios = await usuariosService.listarTodos();
    return res.json(usuarios);
  } catch (erro) {
    return res.status(500).json({ erro: erro.message });
  }
}

async function criar(req, res) {
  try {
    const usuario = await usuariosService.criar(req.body);
    return res.status(201).json(usuario);
  } catch (erro) {
    return res.status(400).json({ erro: erro.message });
  }
}
async function buscarPorId(req, res) {
  try {
    const { id } = req.params;
    const usuario = await usuariosService.buscarPorId(id);
    
    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }
    
    return res.json(usuario);
  } catch (erro) {
    return res.status(500).json({ erro: erro.message });
  }
}

async function atualizar(req, res) {
  try {
    const { id } = req.params;
    const usuarioAtualizado = await usuariosService.atualizar(id, req.body);
    
    if (!usuarioAtualizado) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }
    
    return res.json(usuarioAtualizado);
  } catch (erro) {
    return res.status(400).json({ erro: erro.message });
  }
}

async function deletar(req, res) {
  try {
    const { id } = req.params;
    await usuariosService.deletar(id);
  
    return res.status(204).send();
  } catch (erro) {
    return res.status(500).json({ erro: erro.message });
  }
}

export default {
  listarTodos,
  criar,
  buscarPorId,
  atualizar,
  deletar,
};
