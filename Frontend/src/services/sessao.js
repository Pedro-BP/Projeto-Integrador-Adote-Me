const CHAVE = "adoteme_sessao";

export function salvarSessao({ token, usuario }) {
  localStorage.setItem(CHAVE, JSON.stringify({ token, usuario }));
}

export function obterSessao() {
  const bruto = localStorage.getItem(CHAVE);
  return bruto ? JSON.parse(bruto) : null;
}

export function limparSessao() {
  localStorage.removeItem(CHAVE);
}
