import { obterSessao } from "./sessao";

const API_URL = "http://localhost:8000";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const dados = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(dados?.erro ?? "Erro inesperado. Tente novamente.");
  }

  return dados;
}

function authHeaders() {
  const token = obterSessao()?.token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function login({ email, senha }) {
  return request("/login", {
    method: "POST",
    body: JSON.stringify({ email, senha }),
  });
}

export function cadastrar({ nome, email, senha }) {
  return request("/usuarios", {
    method: "POST",
    body: JSON.stringify({ nome, email, senha }),
  });
}

export function listarPets(filtros = {}) {
  const params = new URLSearchParams(
    Object.fromEntries(Object.entries(filtros).filter(([, v]) => v)),
  );
  const query = params.toString() ? `?${params}` : "";
  return request(`/pets${query}`);
}

export function buscarPet(id) {
  return request(`/pets/${id}`);
}

export function criarPet(dados) {
  return request("/pets", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(dados),
  });
}

export function atualizarPet(id, dados) {
  return request(`/pets/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(dados),
  });
}

export function excluirPet(id) {
  return request(`/pets/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
}
