const CHAVE = "adoteme_sessao";

function decodeBase64Url(str) {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  return atob(padded);
}

function tokenExpirado(token) {
  try {
    const payload = JSON.parse(decodeBase64Url(token.split(".")[1]));
    return !payload.exp || payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

export function salvarSessao({ token, usuario }) {
  localStorage.setItem(CHAVE, JSON.stringify({ token, usuario }));
}

export function obterSessao() {
  const bruto = localStorage.getItem(CHAVE);
  if (!bruto) return null;

  const sessao = JSON.parse(bruto);
  if (tokenExpirado(sessao.token)) {
    limparSessao();
    return null;
  }

  return sessao;
}

export function limparSessao() {
  localStorage.removeItem(CHAVE);
}
