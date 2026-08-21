import { db, auth } from "../config/firebaseAdmin.js";

const colecao = db.collection("usuarios");

async function listarTodos() {
  const snapshot = await colecao.get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function buscarPorId(id) {
  const doc = await colecao.doc(id).get();
  return doc.exists ? { id: doc.id, ...doc.data() } : null;
}

async function buscarPorEmail(email) {
  try {
    return await auth.getUserByEmail(email);
  } catch (err) {
    if (err.code === "auth/user-not-found") return null;
    throw err;
  }
}

async function criar(usuario) {
  const { nome, email, senha, telefone, cidade, foto } = usuario;

  const userRecord = await auth.createUser({
    email,
    password: senha,
    displayName: nome,
  });

  const perfil = {
    nome,
    email,
    telefone: telefone ?? null,
    cidade: cidade ?? null,
    foto: foto ?? null,
    tipo: "usuario",
    status: "ativo",
    created_at: new Date(),
  };

  await colecao.doc(userRecord.uid).set(perfil);

  return { id: userRecord.uid, ...perfil };
}

async function atualizar(id, usuario) {
  const { nome, telefone, cidade, foto, tipo, status } = usuario;
  const campos = { nome, telefone, cidade, foto, tipo, status };
  const camposDefinidos = Object.fromEntries(
    Object.entries(campos).filter(([, valor]) => valor !== undefined)
  );

  await colecao.doc(id).update(camposDefinidos);

  const doc = await colecao.doc(id).get();
  return { id: doc.id, ...doc.data() };
}

async function remover(id) {
  await auth.deleteUser(id).catch(() => {});
  await colecao.doc(id).delete();
  return { removido: true };
}

export default {
  listarTodos,
  buscarPorId,
  buscarPorEmail,
  criar,
  atualizar,
  remover,
};
