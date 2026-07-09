import { useState } from "react";
import LinhaPet from "./LinhaPet";
import { PETS_INICIAIS } from "./petsMock";

const COLUNAS = [
  "Pet",
  "Espécie",
  "Porte",
  "Idade",
  "Localização",
  "Status",
  "Ações",
];

export default function ListaPets() {
  const [pets, setPets] = useState(PETS_INICIAIS);

  function alternarStatus(id) {
    setPets((atual) =>
      atual.map((pet) =>
        pet.id === id
          ? {
              ...pet,
              status: pet.status === "disponivel" ? "adotado" : "disponivel",
            }
          : pet,
      ),
    );
  }

  function excluirPet(id) {
    if (!window.confirm("Excluir este pet do painel?")) return;
    setPets((atual) => atual.filter((pet) => pet.id !== id));
  }

  return (
    <section className="px-6 pb-20">
      <div className="mx-auto max-w-280 overflow-x-auto rounded-[20px] border border-[#1E3D32]/[0.14] bg-white">
        <table className="w-full min-w-[860px] text-left">
          <thead>
            <tr className="border-b border-[#1E3D32]/[0.14]">
              {COLUNAS.map((coluna) => (
                <th
                  key={coluna}
                  className="px-6 py-4 font-[IBM_Plex_Mono,monospace] text-[0.7rem] uppercase tracking-wider text-[#46564B]"
                >
                  {coluna}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => (
              <LinhaPet
                key={pet.id}
                pet={pet}
                onAlternarStatus={alternarStatus}
                onExcluir={excluirPet}
              />
            ))}
          </tbody>
        </table>

        {pets.length === 0 && (
          <p className="px-6 py-10 text-center text-sm text-[#46564B]">
            Nenhum pet cadastrado no momento.
          </p>
        )}
      </div>
    </section>
  );
}
