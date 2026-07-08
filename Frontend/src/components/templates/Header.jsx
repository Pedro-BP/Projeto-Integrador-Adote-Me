import { useState } from "react";

const NAV_LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#ajudar", label: "Como ajudar" },
  { href: "#resgates", label: "Recém-acolhidos" },
  { href: "#contato", label: "Contato" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#1E3D32]/[0.14] bg-[#FAF7EF]/90 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <a
          href="#top"
          className="flex items-center gap-2.5 font-[Fraunces,serif] text-3xl font-bold text-[#1E3D32]"
        >
          Adote-Me
        </a>

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
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#doar"
            className="hidden rounded-full bg-[#C15A2B] px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-[#a94a20] sm:inline-flex"
          >
            D
          </a>
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
        </nav>
      )}
    </header>
  );
}
