import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarPets, resolverFotoUrl } from "../../services/api";

export default function OutrosPets({ petAtualId }) {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    listarPets()
      .then((todos) =>
        setPets(todos.filter((p) => p.id !== petAtualId).slice(0, 3)),
      )
      .catch(() => setPets([]));
  }, [petAtualId]);

  if (pets.length === 0) {
    return null;
  }

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-280">
        <div className="mb-12 max-w-xl">
          <h2 className="mb-3.5 font-[Fraunces,serif] text-3xl font-bold text-[#1E3D32] sm:text-[2.3rem] dark:text-[#EDEAE0]">
            Outros pets esperando por um lar
          </h2>
          <p className="text-[#46564B] dark:text-[#A8B0A8]">
            Talvez algum deles também combine com a sua família.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {pets.map((p) => (
            <Link
              key={p.id}
              to={`/animais/${p.id}`}
              className="overflow-hidden rounded-[20px] border border-[#1E3D32]/[0.14] bg-white transition-transform hover:-translate-y-1 dark:border-[#EDEAE0]/[0.14] dark:bg-[#1A2420]"
            >
              <div className="flex aspect-16/11 items-center justify-center overflow-hidden bg-linear-to-br from-[#2F5A48] to-[#1E3D32]">
                {resolverFotoUrl(p.foto) && (
                  <img
                    src={resolverFotoUrl(p.foto)}
                    alt={p.nome}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="p-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-[Fraunces,serif] text-lg font-bold text-[#1E3D32] dark:text-[#EDEAE0]">
                    {p.nome}
                  </span>
                  <span className="rounded-full bg-[#E7EEE5] px-2.5 py-1 font-[IBM_Plex_Mono,monospace] text-[0.66rem] uppercase tracking-wider text-[#1E3D32] dark:bg-[#24332B] dark:text-[#EDEAE0]">
                    {p.status === "disponivel" ? "Disponível" : "Adotado"}
                  </span>
                </div>
                <p className="text-sm text-[#46564B] dark:text-[#A8B0A8]">
                  {p.historia ? `${p.historia.split(".")[0]}.` : ""}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
