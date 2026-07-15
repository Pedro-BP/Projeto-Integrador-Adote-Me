import { Link } from "react-router-dom";
import {
  TIPO_LABEL,
  PORTE_LABEL,
  FOTO_PLACEHOLDER,
} from "../../constants/pets";
import { resolverFotoUrl } from "../../services/api";

export default function LinhaPet({ pet, onAlternarStatus, onExcluir }) {
  const disponivel = pet.status === "disponivel";

  return (
    <tr className="border-b border-[#1E3D32]/8 last:border-0 dark:border-[#EDEAE0]/8">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src={resolverFotoUrl(pet.foto) || FOTO_PLACEHOLDER}
            alt={pet.nome}
            className="h-12 w-12 rounded-full object-cover"
          />
          <span className="font-[Fraunces,serif] text-lg font-bold text-[#1E3D32] dark:text-[#EDEAE0]">
            {pet.nome}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-[#46564B] dark:text-[#A8B0A8]">
        {TIPO_LABEL[pet.tipo]}
      </td>
      <td className="px-6 py-4 text-sm text-[#46564B] dark:text-[#A8B0A8]">
        {PORTE_LABEL[pet.porte]}
      </td>
      <td className="px-6 py-4 text-sm text-[#46564B] dark:text-[#A8B0A8]">{pet.idade}</td>
      <td className="px-6 py-4 text-sm text-[#46564B] dark:text-[#A8B0A8]">
        {pet.bairro}, {pet.cidade}
      </td>
      <td className="px-6 py-4">
        <span
          className={`rounded-full px-2.5 py-1 font-[IBM_Plex_Mono,monospace] text-[0.66rem] uppercase tracking-wider ${
            disponivel
              ? "bg-[#E7EEE5] text-[#1E3D32] dark:bg-[#24332B] dark:text-[#EDEAE0]"
              : "bg-cyan-50 text-cyan-700"
          }`}
        >
          {disponivel ? "Disponível" : "Adotado"}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            title="Editar"
            to={`/admin/pets/${pet.id}/editar`}
            className="rounded-full border border-[#1E3D32] px-4 py-1.5 text-xs font-semibold text-[#1E3D32] transition hover:bg-[#1E3D32] hover:text-white dark:border-[#EDEAE0] dark:text-[#EDEAE0] dark:hover:bg-[#EDEAE0] dark:hover:text-[#121815]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-pencil-line-icon lucide-pencil-line"
            >
              <path d="M13 21h8" />
              <path d="m15 5 4 4" />
              <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
            </svg>
          </Link>
          <button
            type="button"
            onClick={() => onAlternarStatus(pet.id)}
            className="rounded-full border border-cyan-600 px-4 py-1.5 text-xs font-semibold text-cyan-700 transition hover:bg-cyan-600 hover:text-white"
          >
            Marcar como {disponivel ? "adotado" : "disponível"}
          </button>
          <button
            title="Deletar"
            type="button"
            onClick={() => onExcluir(pet.id)}
            className="px-2 py-1.5 text-xs font-semibold text-[#C15A2B] transition hover:underline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-trash2-icon lucide-trash-2"
            >
              <path d="M10 11v6" />
              <path d="M14 11v6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
              <path d="M3 6h18" />
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}
