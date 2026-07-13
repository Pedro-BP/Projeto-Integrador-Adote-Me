import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BotaoMostrarSenha from "../templates/BotaoMostrarSenha";
import { login } from "../../services/api";
import { salvarSessao } from "../../services/sessao";

export default function FormularioLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    if (!email || !senha) {
      setErro("Preencha e-mail e senha para continuar.");
      return;
    }

    setCarregando(true);
    try {
      const dados = await login({ email, senha });
      salvarSessao(dados);
      navigate("/");
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-12 md:w-1/2 lg:px-20">
      <div className="mx-auto w-full max-w-sm">
        <Link
          to="/"
          className="mb-10 inline-flex items-center gap-2.5 font-[Fraunces,serif] text-3xl font-bold text-[#1E3D32]"
        >
          Adote-Me
        </Link>

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
              <BotaoMostrarSenha
                visible={mostrarSenha}
                onToggle={() => setMostrarSenha((v) => !v)}
              />
            </div>
          </div>

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
          <Link
            to="/cadastro"
            className="font-semibold text-cyan-600 hover:underline"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
