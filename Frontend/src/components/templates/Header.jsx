import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { obterSessao, limparSessao } from "../../services/sessao";
import { obterTema, alternarTema } from "../../services/tema";

const links = [
  { href: "/#sobre", label: "Sobre" },
  { href: "/#ajudar", label: "Como ajudar" },
  { href: "/#resgates", label: "Recém-acolhidos" },
  { href: "#contato", label: "Contato" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sessao, setSessao] = useState(() => obterSessao());
  const [tema, setTema] = useState(() => obterTema());
  const navigate = useNavigate();

  function handleSair() {
    limparSessao();
    setSessao(null);
    navigate("/");
  }

  function handleAlternarTema() {
    setTema(alternarTema(tema));
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#1E3D32]/[0.14] bg-[#FAF7EF]/90 backdrop-blur-sm dark:border-[#EDEAE0]/[0.14] dark:bg-[#121815]/90">
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/">
          <img src="/logoAdote_me.png" alt="Adote-Me" className="h-11 w-auto" />
        </Link>

        <nav
          className="hidden gap-8 text-sm font-medium text-[#46564B] dark:text-[#A8B0A8] md:flex"
          aria-label="Navegação principal"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-[#1E3D32] dark:hover:text-[#EDEAE0]"
            >
              {link.label}
            </a>
          ))}
          <Link to="/feed" className="transition-colors hover:text-[#1E3D32] dark:hover:text-[#EDEAE0]">
            Feed
          </Link>
          {sessao?.usuario.perfil === "admin" && (
            <Link
              to="/admin"
              className="transition-colors hover:text-[#1E3D32] dark:hover:text-[#EDEAE0]"
            >
              Painel
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <button
            title={tema === "escuro" ? "Ativar tema claro" : "Ativar tema escuro"}
            type="button"
            onClick={handleAlternarTema}
            className="inline-flex rounded-[10px] border border-[#1E3D32]/[0.14] p-2 text-[#1E3D32] transition-colors hover:bg-[#1E3D32]/5 dark:border-[#EDEAE0]/[0.14] dark:text-[#EDEAE0] dark:hover:bg-[#EDEAE0]/10"
          >
            {tema === "escuro" ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          {sessao ? (
            <div className="hidden items-center gap-3 sm:flex">
              <button
                title="Sair"
                type="button"
                onClick={handleSair}
                className="text-sm font-medium text-[#46564B] hover:text-[#1E3D32] cursor-pointer dark:text-[#A8B0A8] dark:hover:text-[#EDEAE0]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-arrow-left-from-line-icon lucide-arrow-left-from-line"
                >
                  <path d="m9 6-6 6 6 6" />
                  <path d="M3 12h14" />
                  <path d="M21 19V5" />
                </svg>
              </button>
              <span
                title={sessao.usuario.nome}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-600 text-sm font-semibold text-white"
              >
                {sessao.usuario.nome.charAt(0).toUpperCase()}
              </span>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden rounded-full bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-stone-800 sm:inline-flex"
            >
              Entrar
            </Link>
          )}
          <button
            className="inline-flex rounded-[10px] border border-[#1E3D32]/[0.14] p-2 text-[#1E3D32] dark:border-[#EDEAE0]/[0.14] dark:text-[#EDEAE0] md:hidden"
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          className="flex flex-col gap-1 border-b border-[#1E3D32]/[0.14] px-6 pb-5 dark:border-[#EDEAE0]/[0.14] md:hidden"
          aria-label="Navegação móvel"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-[#1E3D32]/[0.14] py-2.5 font-medium text-[#46564B] dark:border-[#EDEAE0]/[0.14] dark:text-[#A8B0A8]"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/feed"
            onClick={() => setMenuOpen(false)}
            className="border-b border-[#1E3D32]/[0.14] py-2.5 font-medium text-[#46564B] dark:border-[#EDEAE0]/[0.14] dark:text-[#A8B0A8]"
          >
            Feed
          </Link>
          {sessao?.usuario.perfil === "admin" && (
            <Link
              to="/admin"
              onClick={() => setMenuOpen(false)}
              className="border-b border-[#1E3D32]/[0.14] py-2.5 font-medium text-[#46564B] dark:border-[#EDEAE0]/[0.14] dark:text-[#A8B0A8]"
            >
              Painel
            </Link>
          )}
          {sessao ? (
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                handleSair();
              }}
              className="py-2.5 text-left font-medium text-[#46564B] dark:text-[#A8B0A8]"
            >
              Sair ({sessao.usuario.nome})
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="py-2.5 font-medium text-[#46564B] dark:text-[#A8B0A8]"
            >
              Entrar
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
