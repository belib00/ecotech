import { db } from "../config/firebaseAdmin.js";

const colecao = db.collection("feedbacks");

async function listarTodos() {
  const snapshot = await colecao.get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function criar(dados) {
  const { usuario_id = null, titulo = null, mensagem, nota = null } = dados;

  const feedback = { usuario_id, titulo, mensagem, nota, created_at: new Date() };

  const ref = await colecao.add(feedback);
  return { id: ref.id, ...feedback };
}

export default {
  listarTodos,
  criar,
};
