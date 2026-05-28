const API_URL = 'http://localhost:3000';

export async function buscarUsuarios() {
  const response = await fetch(`${API_URL}/usuarios`);
  return response.json();
}

export async function criarUsuario(nome: string, email: string) {
  const response = await fetch(`${API_URL}/usuarios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nome,
      email,
    }),
  });

  return response.json();
}