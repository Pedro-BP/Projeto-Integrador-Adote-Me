import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [lembrar, setLembrar] = useState(false);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    if (!email || !senha) {
      setErro("Preencha e-mail e senha para continuar.");
      return;
    }

    setCarregando(true);
    setTimeout(() => setCarregando(false), 900);
  }

  return (
    <div className="flex min-h-screen bg-[#FAF7EF] text-[#1C2620] font-[Inter,sans-serif] antialiased">
      {/* Fontes — em produção mova este @import para o seu globals.css */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,500&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap');
      `}</style>

      {/* ---------- Formulário ---------- */}
      <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-12 md:w-1/2 lg:px-20">
        <div className="mx-auto w-full max-w-sm">
          <a
            href="/"
            className="mb-10 inline-flex items-center gap-2.5 font-[Fraunces,serif] text-3xl font-bold text-[#1E3D32]"
          >
            Adote-Me
          </a>

          <h1 className="mb-2 font-[Fraunces,serif] text-3xl font-bold text-[#1E3D32] sm:text-4xl">
            Bem-vindo de volta
          </h1>

          {erro && (
            <div
              role="alert"
              className="mb-5 rounded-xl border border-[#C15A2B]/30 bg-[#C15A2B]/10 px-4 py-3 text-sm text-[#C15A2B]"
            >
              {erro}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="grid gap-5">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-[#1C2620]"
              >
                E-mail
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full rounded-xl border border-[#1E3D32]/18 bg-white px-4 py-3 text-[#1C2620] outline-none transition-colors placeholder:text-[#46564B]/60 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20"
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  htmlFor="senha"
                  className="block text-sm font-medium text-[#1C2620]"
                >
                  Senha
                </label>
                <a
                  href="#"
                  className="text-sm font-medium text-cyan-600 hover:underline"
                >
                  Esqueceu a senha?
                </a>
              </div>
              <div className="relative">
                <input
                  id="senha"
                  type={mostrarSenha ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-[#1E3D32]/18 bg-white px-4 py-3 pr-11 text-[#1C2620] outline-none transition-colors placeholder:text-[#46564B]/60 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20"
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha((v) => !v)}
                  aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                  className="absolute inset-y-0 right-0 flex items-center px-3.5 text-[#46564B] hover:text-[#1E3D32]"
                >
                  {mostrarSenha ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        d="M3 3l18 18M10.58 10.58a2 2 0 002.83 2.83M9.88 5.09A9.77 9.77 0 0112 5c5 0 9 4.5 10 7-.42.96-1.14 2.07-2.13 3.09M6.1 6.1C3.9 7.44 2.42 9.4 2 12c1 2.5 5 7 10 7 1.06 0 2.06-.18 3-.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-[#46564B]">
              <input
                type="checkbox"
                checked={lembrar}
                onChange={(e) => setLembrar(e.target.checked)}
                className="h-4 w-4 rounded border-[#1E3D32]/30 text-cyan-600 focus:ring-cyan-600/30"
              />
              Lembrar de mim
            </label>

            <button
              type="submit"
              disabled={carregando}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-stone-800 disabled:pointer-events-none disabled:opacity-60"
            >
              {carregando ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[#46564B]">
            Ainda não tem conta?{" "}
            <a
              href="/cadastro"
              className="font-semibold text-cyan-600 hover:underline"
            >
              Cadastre-se
            </a>
          </p>
        </div>
      </div>

      {/* ---------- Painel decorativo ---------- */}
      <div className="relative hidden w-1/2 items-center justify-center overflow-hidden bg-gradient-to-br from-[#1E3D32] via-[#2F5A48] to-[#E3A63D] md:flex">
        <div className="absolute inset-8 flex flex-col justify-end rounded-[28px] bg-[#1C2620]/25 p-8 backdrop-blur-sm">
          <span className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 font-[IBM_Plex_Mono,monospace] text-[0.7rem] uppercase tracking-[0.08em] text-white">
            Resgate &amp; adoção responsável
          </span>
          <p className="font-[Fraunces,serif] text-2xl font-medium leading-snug text-white">
            "Frase aleatória e super generica para comover os usuários."
          </p>
        </div>
      </div>
    </div>
  );
}
