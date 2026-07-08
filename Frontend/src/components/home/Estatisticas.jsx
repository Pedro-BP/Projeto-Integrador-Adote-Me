const STATS = [
  { value: "1.240+", label: "animais acolhidos" },
  { value: "890", label: "adoções concluídas" },
  { value: "1", label: "ano de atuação" },
];

export default function Estatisticas() {
  return (
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
  );
}
