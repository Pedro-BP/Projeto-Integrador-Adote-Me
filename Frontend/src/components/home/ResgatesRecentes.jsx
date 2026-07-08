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

export default function ResgatesRecentes() {
  return (
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
  );
}
