const CHAVE = "adoteme_tema";

export function obterTema() {
  return document.documentElement.classList.contains("dark") ? "escuro" : "claro";
}

export function alternarTema(temaAtual) {
  const novo = temaAtual === "escuro" ? "claro" : "escuro";
  document.documentElement.classList.toggle("dark", novo === "escuro");
  localStorage.setItem(CHAVE, novo);
  return novo;
}
