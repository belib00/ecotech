import { db } from "../config/firebaseAdmin.js";

const colecao = db.collection("descartes");

async function listarTodos() {
  const snapshot = await colecao.get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function criar(descarte) {
  const { usuario_id = null, ponto_id = null, produto_id = null, status } = descarte;

  const novoDescarte = {
    usuario_id,
    ponto_id,
    produto_id,
    status: status || "Pendente",
    data: new Date(),
  };

  const ref = await colecao.add(novoDescarte);
  return { id: ref.id, ...novoDescarte };
}

export default {
  listarTodos,
  criar,
};
