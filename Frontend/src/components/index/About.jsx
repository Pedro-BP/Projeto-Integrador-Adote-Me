const HIGHLIGHTS = [
  "🏠 Acolhimento responsável",
  "🐾 Animais disponíveis para adoção",
  "❤️ Adoção consciente",
];

export default function About() {
  return (
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
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[0.95rem] text-[#1C2620]">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex aspect-square items-center justify-center rounded-3xl bg-gradient-to-br from-[#E3A63D] to-[#C15A2B]" />
      </div>
    </section>
  );
}
