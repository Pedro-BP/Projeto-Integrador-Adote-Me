const PET = {
  nome: "Thor",
  tipo: "Cachorro",
  porte: "Médio",
  idade: "2 anos",
  cidade: "Tramandaí",
  bairro: "Centro",
  status: "disponivel",
  historia:
    "Thor foi resgatado nas ruas do Centro de Tramandaí com uma pata machucada e sinais de maus-tratos. Depois de semanas de cuidados veterinários e muito carinho da equipe do abrigo, ele se recuperou completamente e hoje é um cachorro brincalhão, dócil e que adora crianças. Está pronto para conhecer sua nova família e recomeçar com todo o amor que merece.",
  numero: "(51) 9101-3434",
  whatsapp: "5551991013434",
  email: "adotemetramandai@gmail.com",
};

const PET_FACTS = [
  { label: "Espécie", value: PET.tipo },
  { label: "Porte", value: PET.porte },
  { label: "Idade", value: PET.idade },
  { label: "Localização", value: `${PET.bairro}, ${PET.cidade}` },
];

export default function DestaquePet() {
  const whatsappHref = `https://wa.me/${PET.whatsapp}?text=${encodeURIComponent(
    `Olá! Vi o ${PET.nome} no Adote-Me e tenho interesse em adotá-lo(a).`,
  )}`;

  return (
    <section id="top" className="overflow-hidden px-6 pb-20 pt-12 md:pt-16">
      <div className="mx-auto max-w-280">
        <a
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-[#46564B] hover:text-[#1E3D32]"
        >
          ← Voltar para adoção
        </a>

        <div className="grid items-center gap-12 md:grid-cols-[1fr_1.1fr]">
          <div className="relative flex aspect-square items-center justify-center rounded-[28px] bg-linear-to-br from-[#2F5A48] to-[#1E3D32]">
            <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1.5 font-[IBM_Plex_Mono,monospace] text-[0.7rem] uppercase tracking-[0.08em] text-cyan-700">
              {PET.status === "disponivel"
                ? "Disponível para adoção"
                : "Adotado"}
            </span>
          </div>

          <div>
            <span className="mb-4 inline-flex items-center gap-2 font-[IBM_Plex_Mono,monospace] text-xs uppercase tracking-[0.12em] text-cyan-600">
              Ficha do animal
            </span>

            <h1 className="mb-5 font-[Fraunces,serif] text-4xl font-bold leading-[1.08] tracking-tight text-stone-800 sm:text-5xl">
              {PET.nome}
            </h1>

            <div className="mb-6 flex flex-wrap gap-2.5">
              {PET_FACTS.map((f) => (
                <span
                  key={f.label}
                  className="rounded-full bg-[#E7EEE5] px-3 py-1.5 font-[IBM_Plex_Mono,monospace] text-[0.7rem] uppercase tracking-wider text-[#1E3D32]"
                >
                  {f.value}
                </span>
              ))}
            </div>

            <p className="mb-8 max-w-[46ch] text-lg text-[#46564B]">
              {PET.historia.split(".")[0]}. Conheça a história completa de{" "}
              {PET.nome} e dê o primeiro passo para mudar a vida dele(a).
            </p>

            <div className="flex flex-wrap gap-3.5">
              <a
                href="#fale-com-ong"
                className="inline-flex items-center justify-center rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-stone-800"
              >
                Quero adotar {PET.nome}
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[#1E3D32] px-6 py-3 text-sm font-semibold text-[#1E3D32] transition-colors hover:bg-stone-800 hover:text-white"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
