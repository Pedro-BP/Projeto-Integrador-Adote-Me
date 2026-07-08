import { useState } from "react";
import PasswordToggleButton from "../templates/PasswordToggleButton";

export default function CadastroForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    if (!nome || !email || !senha || !confirmarSenha) {
      setErro("Preencha todos os campos para continuar.");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setCarregando(true);
    setTimeout(() => setCarregando(false), 900);
  }

  return (
    <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-12 md:w-1/2 lg:px-20">
      <div className="mx-auto w-full max-w-sm">
        <a
          href="/"
          className="mb-10 inline-flex items-center gap-2.5 font-[Fraunces,serif] text-3xl font-bold text-[#1E3D32]"
        >
          Adote-Me
        </a>

        <h1 className="mb-2 font-[Fraunces,serif] text-3xl font-bold text-[#1E3D32] sm:text-4xl">
          Crie sua conta
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
            <label htmlFor="nome" className="mb-1.5 block text-sm font-medium text-[#1C2620]">
              Nome completo
            </label>
            <input
              id="nome"
              type="text"
              autoComplete="name"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome"
              className="w-full rounded-xl border border-[#1E3D32]/18 bg-white px-4 py-3 text-[#1C2620] outline-none transition-colors placeholder:text-[#46564B]/60 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#1C2620]">
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
            <label htmlFor="senha" className="mb-1.5 block text-sm font-medium text-[#1C2620]">
              Senha
            </label>
            <div className="relative">
              <input
                id="senha"
                type={mostrarSenha ? "text" : "password"}
                autoComplete="new-password"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-[#1E3D32]/18 bg-white px-4 py-3 pr-11 text-[#1C2620] outline-none transition-colors placeholder:text-[#46564B]/60 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20"
              />
              <PasswordToggleButton
                visible={mostrarSenha}
                onToggle={() => setMostrarSenha((v) => !v)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirmarSenha" className="mb-1.5 block text-sm font-medium text-[#1C2620]">
              Confirmar senha
            </label>
            <input
              id="confirmarSenha"
              type={mostrarSenha ? "text" : "password"}
              autoComplete="new-password"
              required
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-[#1E3D32]/18 bg-white px-4 py-3 text-[#1C2620] outline-none transition-colors placeholder:text-[#46564B]/60 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20"
            />
          </div>

          <button
            type="submit"
            disabled={carregando}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-stone-800 disabled:pointer-events-none disabled:opacity-60"
          >
            {carregando ? "Criando conta..." : "Criar conta"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-[#46564B]">
          Já tem conta?{" "}
          <a href="/login" className="font-semibold text-cyan-600 hover:underline">
            Entrar
          </a>
        </p>
      </div>
    </div>
  );
}
