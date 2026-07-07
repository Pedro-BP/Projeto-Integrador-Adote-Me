import { useState } from "react";

/* ============================================================
   TUDO QUE ESTÁ AQUI EM CIMA fica FORA do componente Index.
   Listas de dados usadas pela página.
   ============================================================ */

const NAV_LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#ajudar", label: "Como ajudar" },
  { href: "#resgates", label: "Recém-acolhidos" },
  { href: "#contato", label: "Contato" },
];

const STATS = [
  { value: "1.240+", label: "animais acolhidos" },
  { value: "890", label: "adoções concluídas" },
  { value: "1", label: "ano de atuação" },
];

const HELP_CARDS = [
  {
    title: "Adote",
    text: "Conheça os animais disponíveis e encontre um novo companheiro para a família.",
    cta: "Ver animais para adoção",
  },
  {
    title: "Entrega voluntaria",
    text: "Não pode mais cuidar do seu pet? Faça uma doação responsável. Nossa ONG ajudará a encontrar um novo lar seguro e cheio de carinho.",
    cta: "Fazer uma doação",
  },
];

const RESCUES = [
  {
    name: "Mel",
    status: "Adotada",
    text: "Chegou à Adote-Me em busca de um novo lar. Hoje faz parte da família Medeiros.",
  },
  {
    name: "Thor",
    status: "Disponível",
    text: "Resgatado com uma pata machucada, está em recuperação no abrigo.",
  },
  {
    name: "Pandora",
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
          <a href="#top" className="flex items-center gap-2.5 font-[Fraunces,serif] text-3xl font-bold text-[#1E3D32]">
            Adote-Me
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
              D
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
            <span className="mb-5 inline-flex items-center gap-2 font-[IBM_Plex_Mono,monospace] text-xs uppercase tracking-[0.12em] text-cyan-600">
              Conectando pets a novos lares
            </span>

            <h1 className="mb-5 max-w-xl font-[Fraunces,serif] text-[2.3rem] font-bold leading-[1.08] tracking-tight text-stone-800 sm:text-5xl lg:text-[3.6rem]">
              Cada adoção é{" "}
              <em className="font-medium not-italic italic text-cyan-500">um novo começo.</em>
            </h1>

            <p className="mb-8 max-w-[46ch] text-lg text-[#46564B]">
              Acreditamos que todo animal merece um lar. Facilitamos a adoção responsável,
              aproximando pets de famílias que possam oferecer amor e cuidados por toda a vida
            </p>

            <div className="flex flex-wrap gap-3.5">
              <a
                href="#ajudar"
                className="inline-flex items-center justify-center rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-stone-800"
              >
                Quero adotar
              </a>
              <a
                href="#doar"
                className="inline-flex items-center justify-center rounded-full border border-[#1E3D32] px-6 py-3 text-sm font-semibold text-[#1E3D32] transition-colors hover:bg-stone-800 hover:text-white"
              >
                Fazer uma doação
              </a>
            </div>
          </div>

          <div className="relative flex aspect-[4/5] items-center justify-center rounded-[28px] bg-gradient-to-br from-[#1E3D32] via-[#2F5A48] to-[#E3A63D]">
            <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-[#1C2620]/55 px-4 py-3.5 font-[IBM_Plex_Mono,monospace] text-sm text-white backdrop-blur-sm">
              Do Adote-Me para o colo de uma família.
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Stats ---------- */}
      <section className="border-y border-[#1E3D32]/[0.14] bg-cyan-50">
        <div className="mx-auto grid max-w-[1120px] grid-cols-2 gap-7 px-6 py-10 sm:grid-cols-3">
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
      <section id="sobre" className="px-6 py-24">
        <div className="mx-auto grid max-w-[1120px] gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="mb-6 font-[Fraunces,serif] text-3xl font-bold text-[#1E3D32] sm:text-[2.3rem]">
              Sobre o Adote-Me
            </h2>
            <p className="mb-4 text-[#46564B]">
              No Adote-Me, acreditamos que todo animal merece uma segunda chance.
              Nossa missão é conectar cães e gatos que aguardam por um lar a pessoas dispostas a oferecer amor, cuidado e responsabilidade.
              Por meio da nossa plataforma, facilitamos o processo de adoção responsável, aproximando protetores, ONGs e futuros tutores de forma simples,
              segura e organizada.
            </p>
            <p className="mb-4 text-[#46564B]">
              Mais do que um site de adoção, queremos incentivar a conscientização sobre a importância de combater o abandono e promover a guarda responsável.
              Cada adoção representa uma nova história, um recomeço e a oportunidade de transformar a vida de um animal e de uma família.
              Junte-se ao Adote-Me, encontre seu novo melhor amigo e faça parte dessa corrente de solidariedade e amor pelos animais.
            </p>
            <ul className="mt-6 grid gap-3.5">
              {[
                "🏠 Acolhimento responsável",
                "🐾 Animais disponíveis para adoção",
                "❤️ Adoção consciente",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[0.95rem] text-[#1C2620]">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex aspect-square items-center justify-center rounded-3xl bg-gradient-to-br from-[#E3A63D] to-[#C15A2B]" />
        </div>
      </section>

      {/* ---------- Como ajudar ---------- */}
      <section id="ajudar" className="bg-cyan-50 px-6 py-24">
        <div className="mx-auto max-w-[1120px]">
          <div className="mb-12 max-w-xl">
            <h2 className="mb-3.5 font-[Fraunces,serif] text-3xl font-bold text-[#1E3D32] sm:text-[2.3rem]">
              Como você pode ajudar
            </h2>
            <p className="text-[#46564B]">
              Existem várias formas de apoiar o trabalho do instituto, escolha a que combina com você.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {HELP_CARDS.map((c) => (
              <div
                key={c.title}
                className="flex flex-col gap-3.5 rounded-[20px] border border-[#1E3D32]/[0.14] bg-white p-7"
              >
                <h3 className="font-[Fraunces,serif] text-xl text-[#1E3D32]">{c.title}</h3>
                <p className="flex-grow text-sm text-[#46564B]">{c.text}</p>
                <a href="#contato" className="text-sm font-semibold text-cyan-600 hover:underline">
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
                <div className="flex aspect-[16/11] items-center justify-center bg-gradient-to-br from-[#2F5A48] to-[#1E3D32]" />
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
        className="relative mx-6 mb-24 overflow-hidden rounded-[28px] bg-cyan-700 px-8 py-14 text-center text-white"
      >
        <h2 className="relative mb-3 font-[Fraunces,serif] text-3xl font-bold sm:text-[2.2rem]">
          Encontre um novo melhor amigo
        </h2>
        <p className="relative mx-auto mb-7 max-w-[46ch] text-white/80">
          Cada adoção transforma duas vidas: a do animal e a da família que o recebe. Conheça nossos pets disponíveis e ofereça um lar cheio de amor.
        </p>
        <div className="relative flex flex-wrap justify-center gap-3.5">
          <a
            href="#contato"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1E3D32] transition-colors hover:bg-cyan-600 hover:text-white"
          >
            Adotar agora
          </a>
          <a
            href="#ajudar"
            className="inline-flex items-center justify-center rounded-full border border-white/50 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-cyan-600"
          >
            Ver pets disponíveis
          </a>
        </div>
      </div>

      {/* ---------- Footer ---------- */}
      <footer id="contato" className="border-t border-[#1E3D32]/[0.14] px-6 pb-8 pt-12">
        <div className="mx-auto grid max-w-[1120px] gap-8 sm:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="mb-2.5 flex items-center gap-2.5 font-[Fraunces,serif] font-bold text-[#1E3D32]">
              Adote-Me
            </div>
            <p className="max-w-[34ch] text-sm text-[#46564B]">
              Acolhimento e adoção responsável de animais em busca de um novo lar.
            </p>
          </div>

          <div>
            <h4 className="mb-3.5 font-[IBM_Plex_Mono,monospace] text-xs uppercase tracking-[0.06em] text-[#1C2620]">
              ONG
            </h4>
            <ul className="grid gap-2.5">
              <li><a href="#sobre" className="text-sm text-[#46564B] hover:text-[#1E3D32]">Sobre</a></li>
              <li><a href="#resgates" className="text-sm text-[#46564B] hover:text-[#1E3D32]">Recém-acolhidos</a></li>
              <li><a href="#ajudar" className="text-sm text-[#46564B] hover:text-[#1E3D32]">Como ajudar</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3.5 font-[IBM_Plex_Mono,monospace] text-xs uppercase tracking-[0.06em] text-[#1C2620]">
              Contato
            </h4>
            <ul className="grid gap-2.5">
              <li><a href="mailto:contato@focinhofeliz.org" className="text-sm text-[#46564B] hover:text-[#1E3D32]">adotemetramandai@gmail.com</a></li>
              <li><a href="tel:+550000000" className="text-sm text-[#46564B] hover:text-[#1E3D32]">(51) 9101-3434</a></li>
              <li><a href="#" className="text-sm text-[#46564B] hover:text-[#1E3D32]">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-[1120px] border-t border-[#1E3D32]/[0.14] pt-5 text-sm text-[#46564B]">
          © {new Date().getFullYear()} Adote-Me. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}