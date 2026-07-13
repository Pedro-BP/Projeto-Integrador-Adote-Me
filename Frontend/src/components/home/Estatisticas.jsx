import { useEffect, useState } from "react";
import { listarPets } from "../../services/api";

const inicio = new Date(2026, 5, 1);

function calcularTempoAtuacao() {
  const agora = new Date();
  let meses =
    (agora.getFullYear() - inicio.getFullYear()) * 12 +
    (agora.getMonth() - inicio.getMonth());
  if (agora.getDate() < inicio.getDate()) meses -= 1;
  meses = Math.max(meses, 0);

  if (meses < 12) {
    return {
      value: String(meses),
      label: meses === 1 ? "mês de atuação" : "meses de atuação",
    };
  }
  const anos = Math.floor(meses / 12);
  return {
    value: String(anos),
    label: anos === 1 ? "ano de atuação" : "anos de atuação",
  };
}

export default function Estatisticas() {
  const [totalPets, setTotalPets] = useState(null);
  const [totalAdotados, setTotalAdotados] = useState(null);

  useEffect(() => {
    let cancelado = false;

    listarPets()
      .then((pets) => {
        if (cancelado) return;
        setTotalPets(pets.length);
        setTotalAdotados(pets.filter((p) => p.status === "adotado").length);
      })
      .catch(() => {});

    return () => {
      cancelado = true;
    };
  }, []);

  const stats = [
    {
      value: totalPets === null ? "—" : String(totalPets),
      label: "animais acolhidos",
    },
    {
      value: totalAdotados === null ? "—" : String(totalAdotados),
      label: "adoções concluídas",
    },
    calcularTempoAtuacao(),
  ];

  return (
    <section className="border-y border-[#1E3D32]/[0.14] bg-cyan-50">
      <div className="mx-auto grid max-w-280 grid-cols-2 gap-7 px-6 py-10 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="font-[Fraunces,serif] text-3xl font-bold text-[#1E3D32]">
              {s.value}
            </div>
            <div className="mt-1 font-[IBM_Plex_Mono,monospace] text-[0.72rem] uppercase tracking-[0.06em] text-[#46564B]">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
