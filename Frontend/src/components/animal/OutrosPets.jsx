const OTHER_PETS = [
  {
    name: "Pandora",
    status: "Disponível",
    text: "Filhote sociável, já vacinada, esperando por um lar.",
  },
  {
    name: "Bento",
    status: "Disponível",
    text: "Gato tranquilo, adora colo e ambientes calmos.",
  },
  {
    name: "Luna",
    status: "Disponível",
    text: "Cadela dócil, ótima com crianças e outros pets.",
  },
];

export default function OutrosPets() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-280">
        <div className="mb-12 max-w-xl">
          <h2 className="mb-3.5 font-[Fraunces,serif] text-3xl font-bold text-[#1E3D32] sm:text-[2.3rem]">
            Outros pets esperando por um lar
          </h2>
          <p className="text-[#46564B]">
            Talvez algum deles também combine com a sua família.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {OTHER_PETS.map((p) => (
            <a
              key={p.name}
              href="#"
              className="overflow-hidden rounded-[20px] border border-[#1E3D32]/[0.14] bg-white transition-transform hover:-translate-y-1"
            >
              <div className="flex aspect-16/11 items-center justify-center bg-linear-to-br from-[#2F5A48] to-[#1E3D32]" />
              <div className="p-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-[Fraunces,serif] text-lg font-bold text-[#1E3D32]">
                    {p.name}
                  </span>
                  <span className="rounded-full bg-[#E7EEE5] px-2.5 py-1 font-[IBM_Plex_Mono,monospace] text-[0.66rem] uppercase tracking-wider text-[#1E3D32]">
                    {p.status}
                  </span>
                </div>
                <p className="text-sm text-[#46564B]">{p.text}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
