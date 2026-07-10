import { useEffect, useState } from "react";
import CardAnimal from "./CardAnimal";
import { listarPets } from "../../services/api";

export default function Vitrine() {
  const [pets, setPets] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    listarPets()
      .then(setPets)
      .catch((err) => setErro(err.message))
      .finally(() => setCarregando(false));
  }, []);

  return (
    <section className="px-6 pb-20">
      <div className="mx-auto max-w-280">
        {carregando && (
          <p className="text-center text-[#46564B]">Carregando pets...</p>
        )}

        {!carregando && erro && (
          <p className="text-center text-[#C15A2B]">{erro}</p>
        )}

        {!carregando && !erro && pets.length === 0 && (
          <p className="text-center text-[#46564B]">
            Nenhum pet disponível no momento.
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
