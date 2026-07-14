import { obterSessao } from "./sessao";

export const API_URL = "http://localhost:8000";

export function resolverFotoUrl(fotoUrl) {
  if (!fotoUrl) return null;
  if (/^https?:\/\//.test(fotoUrl)) return fotoUrl;
  return `${API_URL}${fotoUrl}`;
}

function montarFormData(dados) {
  const fd = new FormData();
  Object.entries(dados).forEach(([chave, valor]) => {
    if (valor !== null && valor !== undefined) fd.append(chave, valor);
  });
  return fd;
}

async function request(path, options = {}) {
  const ehFormData = options.body instanceof FormData;
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(ehFormData ? {} : { "Content-Type": "application/json" }),
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
    body: montarFormData(dados),
  });
}

export function atualizarPet(id, dados) {
  return request(`/pets/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(dados),
  });
}

export function atualizarFotoPet(id, arquivo) {
  return request(`/pets/${id}/foto`, {
    method: "POST",
    headers: authHeaders(),
    body: montarFormData({ foto: arquivo }),
  });
}

export function excluirPet(id) {
  return request(`/pets/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
}

export function listarPostagens(filtros = {}) {
  const params = new URLSearchParams(
    Object.fromEntries(Object.entries(filtros).filter(([, v]) => v)),
  );
  const query = params.toString() ? `?${params}` : "";
  return request(`/postagens${query}`);
}

export function curtirPostagem(id) {
  return request(`/postagens/${id}/curtir`, { method: "POST" });
}

export function criarPostagem(dados) {
  return request("/postagens", {
    method: "POST",
    headers: authHeaders(),
    body: montarFormData(dados),
  });
}
