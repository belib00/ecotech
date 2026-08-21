import { db } from "../config/firebaseAdmin.js";

const colecao = db.collection("contact_messages");

async function listarTodos() {
  const snapshot = await colecao.get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function criar(dados) {
  const { name, email, message, assunto = null } = dados;

  const novaMensagem = { name, email, message, assunto, created_at: new Date() };

  const ref = await colecao.add(novaMensagem);
  return { id: ref.id, ...novaMensagem };
}

export default {
  listarTodos,
  criar,
};
