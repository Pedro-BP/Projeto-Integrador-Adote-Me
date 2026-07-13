import { useEffect, useState } from "react";
import CardAnimal from "./CardAnimal";
import { listarPets } from "../../services/api";
import { TIPO_LABEL, PORTE_LABEL } from "../../constants/pets";

export default function Vitrine() {
  const [pets, setPets] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [tipo, setTipo] = useState("");
  const [porte, setPorte] = useState("");

  useEffect(() => {
    let cancelado = false;

    async function carregarPets() {
      setCarregando(true);
      setErro("");
      try {
        const resultado = await listarPets({
          status: "disponivel",
          tipo,
          porte,
        });
        if (!cancelado) setPets(resultado);
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
  }, [tipo, porte]);

  return (
    <section className="px-6 pb-20">
      <div className="mx-auto max-w-280">
        <div className="mb-8 flex flex-wrap gap-3.5">
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            aria-label="Filtrar por tipo"
            className="rounded-xl border border-[#1E3D32]/18 bg-white px-4 py-2.5 text-sm text-[#1C2620] outline-none transition-colors focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20"
          >
            <option value="">Todos os tipos</option>
            {Object.entries(TIPO_LABEL).map(([valor, rotulo]) => (
              <option key={valor} value={valor}>
                {rotulo}
              </option>
            ))}
          </select>

          <select
            value={porte}
            onChange={(e) => setPorte(e.target.value)}
            aria-label="Filtrar por porte"
            className="rounded-xl border border-[#1E3D32]/18 bg-white px-4 py-2.5 text-sm text-[#1C2620] outline-none transition-colors focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20"
          >
            <option value="">Todos os portes</option>
            {Object.entries(PORTE_LABEL).map(([valor, rotulo]) => (
              <option key={valor} value={valor}>
                {rotulo}
              </option>
            ))}
          </select>
        </div>

        {carregando && (
          <p className="text-center text-[#46564B]">Carregando pets...</p>
        )}

        {!carregando && erro && (
          <p className="text-center text-[#C15A2B]">{erro}</p>
        )}

        {!carregando && !erro && pets.length === 0 && (
          <p className="text-center text-[#46564B]">
            Nenhum pet disponível com esse filtro no momento.
          </p>
        )}

        {!carregando && !erro && pets.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {pets.map((pet) => (
              <CardAnimal key={pet.id} animal={pet} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
