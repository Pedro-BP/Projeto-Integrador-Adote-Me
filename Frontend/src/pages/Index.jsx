import { useState } from "react";

/* ============================================================
   TUDO QUE ESTÁ AQUI EM CIMA fica FORA do componente Index.
   São "ajudantes": um ícone reutilizável e listas de dados.
   ============================================================ */

// Ícone de pegada de pata, usado várias vezes na página
function Paw({ className = "" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="currentColor" aria-hidden="true">
      <ellipse cx="24" cy="32" rx="12.5" ry="10.5" />
      <ellipse cx="9" cy="15" rx="5.2" ry="7" transform="rotate(-18 9 15)" />
      <ellipse cx="20" cy="8" rx="5" ry="7.2" transform="rotate(-5 20 8)" />
      <ellipse cx="31" cy="8.5" rx="5" ry="7.2" transform="rotate(6 31 8.5)" />
      <ellipse cx="41" cy="16" rx="5.2" ry="7" transform="rotate(20 41 16)" />
    </svg>
  );
}

const NAV_LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#ajudar", label: "Como ajudar" },
  { href: "#resgates", label: "Resgates recentes" },
  { href: "#contato", label: "Contato" },
];

const STATS = [
  { value: "1.240+", label: "animais resgatados" },
  { value: "890", label: "adoções concluídas" },
  { value: "15", label: "anos de atuação" },
  { value: "60", label: "voluntários ativos" },
];

const HELP_CARDS = [
  {
    title: "Adote",
    text: "Conheça os animais disponíveis e encontre um novo companheiro para a família.",
    cta: "Ver animais para adoção",
  },
  {
    title: "Doe",
    text: "Sua contribuição mensal cobre ração, remédio e atendimento veterinário de urgência.",
    cta: "Fazer uma doação",
  },
  {
    title: "Seja voluntário",
    text: "Ajude no abrigo, no transporte de resgates ou compartilhando nosso trabalho.",
    cta: "Quero ser voluntário",
  },
];

const RESCUES = [
  {
    name: "Mel",
    status: "Adotada",
    text: "Encontrada abandonada em uma obra, hoje vive com a família Andrade.",
  },
  {
    name: "Bento",
    status: "Em tratamento",
    text: "Resgatado com uma pata machucada, está em recuperação no abrigo.",
  },
  {
    name: "Nina",
    status: "Disponível",
    text: "Filhote sociável, já vacinada, esperando por um lar.",
  },
];


export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-[#FAF7EF] text-[#1C2620] font-[Inter,sans-serif] antialiased">
      {/* Fontes — em produção mova este @import para o seu globals.css */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,500&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap');
      `}</style>

      {/* ---------- Header ---------- */}
      <header className="sticky top-0 z-50 border-b border-[#1E3D32]/[0.14] bg-[#FAF7EF]/90 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2.5 font-[Fraunces,serif] text-xl font-bold text-[#1E3D32]">
            <Paw className="h-[26px] w-[26px] text-[#C15A2B]" />
            Instituto Focinho Feliz
          </a>

          <nav className="hidden gap-8 text-sm font-medium text-[#46564B] md:flex" aria-label="Navegação principal">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="transition-colors hover:text-[#1E3D32]">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#doar"
              className="hidden rounded-full bg-[#C15A2B] px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-[#a94a20] sm:inline-flex"
            >
              Doar agora
            </a>
            <button
              className="inline-flex rounded-[10px] border border-[#1E3D32]/[0.14] p-2 text-[#1E3D32] md:hidden"
              aria-label="Abrir menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="flex flex-col gap-1 border-b border-[#1E3D32]/[0.14] px-6 pb-5 md:hidden" aria-label="Navegação móvel">
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

      {/* ---------- Hero ---------- */}
      <section id="top" className="overflow-hidden px-6 pb-24 pt-16 md:pt-20">
        <div className="mx-auto grid max-w-[1120px] items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="mb-5 inline-flex items-center gap-2 font-[IBM_Plex_Mono,monospace] text-xs uppercase tracking-[0.12em] text-[#C15A2B]">
              <Paw className="h-3.5 w-3.5" /> Resgate &amp; adoção responsável
            </span>

            <h1 className="mb-5 max-w-xl font-[Fraunces,serif] text-[2.3rem] font-bold leading-[1.08] tracking-tight text-[#1E3D32] sm:text-5xl lg:text-[3.6rem]">
              Cada resgate é{" "}
              <em className="font-medium not-italic italic text-[#C15A2B]">um recomeço.</em>
            </h1>

            <p className="mb-8 max-w-[46ch] text-lg text-[#46564B]">
              Atuamos no resgate, tratamento e adoção de animais em situação de risco,
              conectando cada bicho resgatado a um lar responsável.
            </p>

            <div className="flex flex-wrap gap-3.5">
              <a
                href="#ajudar"
                className="inline-flex items-center justify-center rounded-full bg-[#C15A2B] px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-[#a94a20]"
              >
                Quero adotar
              </a>
              <a
                href="#doar"
                className="inline-flex items-center justify-center rounded-full border border-[#1E3D32] px-6 py-3 text-sm font-semibold text-[#1E3D32] transition-colors hover:bg-[#1E3D32] hover:text-white"
              >
                Fazer uma doação
              </a>
            </div>
          </div>

          <div className="relative flex aspect-[4/5] items-center justify-center rounded-[28px] bg-gradient-to-br from-[#1E3D32] via-[#2F5A48] to-[#E3A63D]">
            <Paw className="h-[46%] w-[46%] text-white/[0.16]" />
            <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-[#1C2620]/55 px-4 py-3.5 font-[IBM_Plex_Mono,monospace] text-sm text-white backdrop-blur-sm">
              Do resgate nas ruas ao colo de uma família.
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Stats ---------- */}
      <section className="border-y border-[#1E3D32]/[0.14] bg-[#E7EEE5]">
        <div className="mx-auto grid max-w-[1120px] grid-cols-2 gap-7 px-6 py-10 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="font-[Fraunces,serif] text-3xl font-bold text-[#1E3D32]">{s.value}</div>
              <div className="mt-1 font-[IBM_Plex_Mono,monospace] text-[0.72rem] uppercase tracking-[0.06em] text-[#46564B]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Sobre ---------- */}
      <section id="sobre" className="px-6 py-24">
        <div className="mx-auto grid max-w-[1120px] gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="mb-6 font-[Fraunces,serif] text-3xl font-bold text-[#1E3D32] sm:text-[2.3rem]">
              Sobre o instituto
            </h2>
            <p className="mb-4 text-[#46564B]">
              Começamos como um grupo de voluntários atendendo chamados de resgate na região
              metropolitana. Hoje mantemos um abrigo próprio, parceria com clínicas veterinárias
              e uma rede de lares temporários.
            </p>
            <p className="mb-4 text-[#46564B]">
              Cada animal que chega passa por avaliação veterinária, vacinação e, quando
              necessário, tratamento prolongado antes de entrar no programa de adoção.
            </p>
            <ul className="mt-6 grid gap-3.5">
              {[
                "Resgate 24h para casos de urgência",
                "Castração e vacinação de todos os animais",
                "Acompanhamento pós-adoção",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[0.95rem] text-[#1C2620]">
                  <Paw className="mt-0.5 h-[18px] w-[18px] flex-shrink-0 text-[#C15A2B]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex aspect-square items-center justify-center rounded-3xl bg-gradient-to-br from-[#E3A63D] to-[#C15A2B]">
            <Paw className="h-[38%] w-[38%] text-white/35" />
          </div>
        </div>
      </section>

      {/* ---------- Como ajudar ---------- */}
      <section id="ajudar" className="bg-[#E7EEE5] px-6 py-24">
        <div className="mx-auto max-w-[1120px]">
          <div className="mb-12 max-w-xl">
            <h2 className="mb-3.5 font-[Fraunces,serif] text-3xl font-bold text-[#1E3D32] sm:text-[2.3rem]">
              Como você pode ajudar
            </h2>
            <p className="text-[#46564B]">
              Existem várias formas de apoiar o trabalho do instituto, escolha a que combina com você.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {HELP_CARDS.map((c) => (
              <div
                key={c.title}
                className="flex flex-col gap-3.5 rounded-[20px] border border-[#1E3D32]/[0.14] bg-white p-7"
              >
                <Paw className="h-6 w-6 text-[#C15A2B]" />
                <h3 className="font-[Fraunces,serif] text-xl text-[#1E3D32]">{c.title}</h3>
                <p className="flex-grow text-sm text-[#46564B]">{c.text}</p>
                <a href="#contato" className="text-sm font-semibold text-[#C15A2B] hover:underline">
                  {c.cta} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Resgates recentes ---------- */}
      <section id="resgates" className="px-6 py-24">
        <div className="mx-auto max-w-[1120px]">
          <div className="mb-12 max-w-xl">
            <h2 className="mb-3.5 font-[Fraunces,serif] text-3xl font-bold text-[#1E3D32] sm:text-[2.3rem]">
              Resgates recentes
            </h2>
            <p className="text-[#46564B]">
              Alguns dos animais que passaram — ou ainda estão — sob nossos cuidados.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {RESCUES.map((r) => (
              <div key={r.name} className="overflow-hidden rounded-[20px] border border-[#1E3D32]/[0.14] bg-white">
                <div className="flex aspect-[16/11] items-center justify-center bg-gradient-to-br from-[#2F5A48] to-[#1E3D32]">
                  <Paw className="h-[34%] w-[34%] text-white/20" />
                </div>
                <div className="p-5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-[Fraunces,serif] text-lg font-bold text-[#1E3D32]">{r.name}</span>
                    <span className="rounded-full bg-[#E7EEE5] px-2.5 py-1 font-[IBM_Plex_Mono,monospace] text-[0.66rem] uppercase tracking-[0.05em] text-[#1E3D32]">
                      {r.status}
                    </span>
                  </div>
                  <p className="text-sm text-[#46564B]">{r.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <div
        id="doar"
        className="relative mx-6 mb-24 overflow-hidden rounded-[28px] bg-[#1E3D32] px-8 py-14 text-center text-white"
      >
        <Paw className="pointer-events-none absolute -bottom-10 -right-8 h-[220px] w-[220px] text-white/[0.06]" />
        <h2 className="relative mb-3 font-[Fraunces,serif] text-3xl font-bold sm:text-[2.2rem]">
          Sua doação mantém o resgate funcionando
        </h2>
        <p className="relative mx-auto mb-7 max-w-[46ch] text-white/80">
          Com R$30 por mês você ajuda a custear ração, vacinas e atendimento de urgência para os animais do abrigo.
        </p>
        <div className="relative flex flex-wrap justify-center gap-3.5">
          <a
            href="#contato"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1E3D32] transition-transform hover:-translate-y-0.5"
          >
            Doar agora
          </a>
          <a
            href="#ajudar"
            className="inline-flex items-center justify-center rounded-full border border-white/50 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Conhecer outras formas de ajudar
          </a>
        </div>
      </div>

      {/* ---------- Footer ---------- */}
      <footer id="contato" className="border-t border-[#1E3D32]/[0.14] px-6 pb-8 pt-12">
        <div className="mx-auto grid max-w-[1120px] gap-8 sm:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="mb-2.5 flex items-center gap-2.5 font-[Fraunces,serif] font-bold text-[#1E3D32]">
              <Paw className="h-5 w-5 text-[#C15A2B]" /> Instituto Focinho Feliz
            </div>
            <p className="max-w-[34ch] text-sm text-[#46564B]">
              Resgate, tratamento e adoção responsável de animais em situação de vulnerabilidade.
            </p>
          </div>

          <div>
            <h4 className="mb-3.5 font-[IBM_Plex_Mono,monospace] text-xs uppercase tracking-[0.06em] text-[#1C2620]">
              Instituto
            </h4>
            <ul className="grid gap-2.5">
              <li><a href="#sobre" className="text-sm text-[#46564B] hover:text-[#1E3D32]">Sobre</a></li>
              <li><a href="#resgates" className="text-sm text-[#46564B] hover:text-[#1E3D32]">Resgates recentes</a></li>
              <li><a href="#ajudar" className="text-sm text-[#46564B] hover:text-[#1E3D32]">Como ajudar</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3.5 font-[IBM_Plex_Mono,monospace] text-xs uppercase tracking-[0.06em] text-[#1C2620]">
              Contato
            </h4>
            <ul className="grid gap-2.5">
              <li><a href="mailto:contato@focinhofeliz.org" className="text-sm text-[#46564B] hover:text-[#1E3D32]">contato@focinhofeliz.org</a></li>
              <li><a href="tel:+550000000" className="text-sm text-[#46564B] hover:text-[#1E3D32]">(00) 0000-0000</a></li>
              <li><a href="#" className="text-sm text-[#46564B] hover:text-[#1E3D32]">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-[1120px] border-t border-[#1E3D32]/[0.14] pt-5 text-sm text-[#46564B]">
          © {new Date().getFullYear()} Instituto Focinho Feliz. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}