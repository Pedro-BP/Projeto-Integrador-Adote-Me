import { useEffect, useState } from "react";
import { listarPets, resolverFotoUrl } from "../../services/api";
import { FOTO_PLACEHOLDER } from "../../constants/pets";

export default function ResgatesRecentes() {
  const [pets, setPets] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let cancelado = false;

    async function carregarPets() {
      setCarregando(true);
      setErro("");
      try {
        const resultado = await listarPets();
        if (!cancelado) setPets(resultado.slice(0, 3));
      } catch (err) {
        if (!cancelado) setErro(err.message);
      } finally {
        if (!cancelado) setCarregando(false);
      }
    }

    carregarPets();
    return () => {
      cancelado = true;
    };
  }, []);

  return (
    <section id="resgates" className="px-6 py-24">
      <div className="mx-auto max-w-280">
        <div className="mb-12 max-w-xl">
          <h2 className="mb-3.5 font-[Fraunces,serif] text-3xl font-bold text-[#1E3D32] sm:text-[2.3rem] dark:text-[#EDEAE0]">
            Resgates recentes
          </h2>
          <p className="text-[#46564B] dark:text-[#A8B0A8]">
            Alguns dos animais que passaram — ou ainda estão — sob nossos
            cuidados.
          </p>
        </div>

        {carregando && (
          <p className="text-center text-[#46564B] dark:text-[#A8B0A8]">Carregando pets...</p>
        )}

        {!carregando && erro && (
          <p className="text-center text-[#C15A2B]">{erro}</p>
        )}

        {!carregando && !erro && pets.length === 0 && (
          <p className="text-center text-[#46564B] dark:text-[#A8B0A8]">
            Nenhum pet cadastrado ainda.
          </p>
        )}

        {!carregando && !erro && pets.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-3">
            {pets.map((pet) => (
              <div
                key={pet.id}
                className="overflow-hidden rounded-[20px] border border-[#1E3D32]/[0.14] bg-white dark:border-[#EDEAE0]/[0.14] dark:bg-[#1A2420]"
              >
                <img
                  src={resolverFotoUrl(pet.foto) || FOTO_PLACEHOLDER}
                  alt={pet.nome}
                  className="aspect-16/11 w-full object-cover"
                />
                <div className="p-5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-[Fraunces,serif] text-lg font-bold text-[#1E3D32] dark:text-[#EDEAE0]">
                      {pet.nome}
                    </span>
                    <span className="rounded-full bg-[#E7EEE5] px-2.5 py-1 font-[IBM_Plex_Mono,monospace] text-[0.66rem] uppercase tracking-wider text-[#1E3D32] dark:bg-[#24332B] dark:text-[#EDEAE0]">
                      {pet.status === "adotado" ? "Adotado" : "Disponível"}
                    </span>
                  </div>
                  <p className="text-sm text-[#46564B] dark:text-[#A8B0A8]">
                    {pet.historia || "Em busca de um novo lar."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
