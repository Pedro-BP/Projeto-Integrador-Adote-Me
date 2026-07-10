import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { obterSessao, limparSessao } from "../../services/sessao";

const NAV_LINKS = [
  { href: "/#sobre", label: "Sobre" },
  { href: "/#ajudar", label: "Como ajudar" },
  { href: "/#resgates", label: "Recém-acolhidos" },
  { href: "#contato", label: "Contato" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sessao, setSessao] = useState(() => obterSessao());
  const navigate = useNavigate();

  function handleSair() {
    limparSessao();
    setSessao(null);
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#1E3D32]/[0.14] bg-[#FAF7EF]/90 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/">
          <img
            src="/logoAdote_me.png"
            alt="Adote-Me"
            className="h-11 w-auto"
          />
        </Link>

        <nav
          className="hidden gap-8 text-sm font-medium text-[#46564B] md:flex"
          aria-label="Navegação principal"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-[#1E3D32]"
            >
              {link.label}
            </a>
          ))}
          {sessao?.usuario.perfil === "admin" && (
            <Link
              to="/admin"
              className="transition-colors hover:text-[#1E3D32]"
            >
              Painel
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {sessao ? (
            <div className="hidden items-center gap-3 sm:flex">
              <span
                title={sessao.usuario.nome}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-600 text-sm font-semibold text-white"
              >
                {sessao.usuario.nome.charAt(0).toUpperCase()}
              </span>
              <button
                type="button"
                onClick={handleSair}
                className="text-sm font-medium text-[#46564B] hover:text-[#1E3D32]"
              >
                Sair
              </button>
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
            className="inline-flex rounded-[10px] border border-[#1E3D32]/[0.14] p-2 text-[#1E3D32] md:hidden"
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
          className="flex flex-col gap-1 border-b border-[#1E3D32]/[0.14] px-6 pb-5 md:hidden"
          aria-label="Navegação móvel"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-[#1E3D32]/[0.14] py-2.5 font-medium text-[#46564B]"
            >
              {link.label}
            </a>
          ))}
          {sessao?.usuario.perfil === "admin" && (
            <Link
              to="/admin"
              onClick={() => setMenuOpen(false)}
              className="border-b border-[#1E3D32]/[0.14] py-2.5 font-medium text-[#46564B]"
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
              className="py-2.5 text-left font-medium text-[#46564B]"
            >
              Sair ({sessao.usuario.nome})
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="py-2.5 font-medium text-[#46564B]"
            >
              Entrar
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
