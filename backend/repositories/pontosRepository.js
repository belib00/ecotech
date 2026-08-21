import { db } from "../config/firebaseAdmin.js";

const colecao = db.collection("pontos_coleta");

async function listarTodos() {
  const snapshot = await colecao.get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function criar(ponto) {
  const {
    nome,
    endereco,
    cidade = null,
    latitude = null,
    longitude = null,
    horario = null,
    telefone = null,
  } = ponto;

  const novoPonto = { nome, endereco, cidade, latitude, longitude, horario, telefone };

  const ref = await colecao.add(novoPonto);
  return { id: ref.id, ...novoPonto };
}

export default {
  listarTodos,
  criar,
};
