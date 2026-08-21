import { db } from "../config/firebaseAdmin.js";

const colecao = db.collection("produtos");

async function listarTodos() {
  const snapshot = await colecao.get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function criar(dados) {
  const {
    nome,
    descricao = null,
    categoria_id = null,
    estado = null,
    preco = null,
    imagem = null,
    usuario_id = null,
  } = dados;

  const produto = {
    nome,
    descricao,
    categoria_id,
    estado,
    preco,
    imagem,
    usuario_id,
    disponivel: true,
    created_at: new Date(),
    updated_at: new Date(),
  };

  const ref = await colecao.add(produto);
  return { id: ref.id, ...produto };
}

export default {
  listarTodos,
  criar,
};
