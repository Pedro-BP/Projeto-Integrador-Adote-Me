import { useEffect, useState } from "react";
import LinhaPet from "./LinhaPet";
import { listarPets, atualizarPet, excluirPet } from "../../services/api";
import { TIPO_LABEL, PORTE_LABEL } from "../../constants/pets";

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
        const resultado = await listarPets({ tipo, porte });
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

  async function alternarStatus(id) {
    const pet = pets.find((p) => p.id === id);
    const novoStatus = pet.status === "disponivel" ? "adotado" : "disponivel";
    try {
      await atualizarPet(id, { status: novoStatus });
      setPets((atual) =>
        atual.map((p) => (p.id === id ? { ...p, status: novoStatus } : p)),
      );
    } catch (err) {
      window.alert(err.message);
    }
  }

  async function handleExcluir(id) {
    if (!window.confirm("Excluir este pet do painel?")) return;
    try {
      await excluirPet(id);
      setPets((atual) => atual.filter((p) => p.id !== id));
    } catch (err) {
      window.alert(err.message);
    }
  }

  return (
    <section className="px-6 pb-20">
      <div className="mx-auto mb-6 flex max-w-280 flex-wrap gap-3.5">
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          aria-label="Filtrar por tipo"
          className="rounded-xl border border-[#1E3D32]/18 bg-white px-4 py-2.5 text-sm text-[#1C2620] outline-none transition-colors focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20 dark:border-[#EDEAE0]/18 dark:bg-[#1A2420] dark:text-[#F5F3EA]"
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
          className="rounded-xl border border-[#1E3D32]/18 bg-white px-4 py-2.5 text-sm text-[#1C2620] outline-none transition-colors focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20 dark:border-[#EDEAE0]/18 dark:bg-[#1A2420] dark:text-[#F5F3EA]"
        >
          <option value="">Todos os portes</option>
          {Object.entries(PORTE_LABEL).map(([valor, rotulo]) => (
            <option key={valor} value={valor}>
              {rotulo}
            </option>
          ))}
        </select>
      </div>

      <div className="mx-auto max-w-280 overflow-x-auto rounded-[20px] border border-[#1E3D32]/[0.14] bg-white dark:border-[#EDEAE0]/[0.14] dark:bg-[#1A2420]">
        {carregando && (
          <p className="px-6 py-10 text-center text-sm text-[#46564B] dark:text-[#A8B0A8]">
            Carregando pets...
          </p>
        )}

        {!carregando && erro && (
          <p className="px-6 py-10 text-center text-sm text-[#C15A2B]">
            {erro}
          </p>
        )}

        {!carregando && !erro && (
          <>
            <table className="w-full min-w-215 text-left">
              <thead>
                <tr className="border-b border-[#1E3D32]/[0.14] dark:border-[#EDEAE0]/[0.14]">
                  {COLUNAS.map((coluna) => (
                    <th
                      key={coluna}
                      className="px-6 py-4 font-[IBM_Plex_Mono,monospace] text-[0.7rem] uppercase tracking-wider text-[#46564B] dark:text-[#A8B0A8]"
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
                    onExcluir={handleExcluir}
                  />
                ))}
              </tbody>
            </table>

            {pets.length === 0 && (
              <p className="px-6 py-10 text-center text-sm text-[#46564B] dark:text-[#A8B0A8]">
                {tipo || porte
                  ? "Nenhum pet cadastrado com esse filtro."
                  : "Nenhum pet cadastrado no momento."}
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
