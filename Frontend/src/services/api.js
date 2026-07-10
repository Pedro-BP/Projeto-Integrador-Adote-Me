const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

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
