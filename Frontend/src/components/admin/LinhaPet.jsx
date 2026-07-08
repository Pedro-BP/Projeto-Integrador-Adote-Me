export default function LinhaPet({ pet, onAlternarStatus, onExcluir }) {
  const disponivel = pet.status === "disponivel";

  return (
    <tr className="border-b border-[#1E3D32]/[0.08] last:border-0">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src={pet.fotoUrl}
            alt={pet.nome}
            className="h-12 w-12 rounded-full object-cover"
          />
          <span className="font-[Fraunces,serif] text-lg font-bold text-[#1E3D32]">
            {pet.nome}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-[#46564B]">{pet.tipo}</td>
      <td className="px-6 py-4 text-sm text-[#46564B]">{pet.porte}</td>
      <td className="px-6 py-4 text-sm text-[#46564B]">{pet.idade}</td>
      <td className="px-6 py-4 text-sm text-[#46564B]">
        {pet.bairro}, {pet.cidade}
      </td>
      <td className="px-6 py-4">
        <span
          className={`rounded-full px-2.5 py-1 font-[IBM_Plex_Mono,monospace] text-[0.66rem] uppercase tracking-wider ${
            disponivel
              ? "bg-[#E7EEE5] text-[#1E3D32]"
              : "bg-cyan-50 text-cyan-700"
          }`}
        >
          {disponivel ? "Disponível" : "Adotado"}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href={`/admin/pets/${pet.id}/editar`}
            className="rounded-full border border-[#1E3D32] px-4 py-1.5 text-xs font-semibold text-[#1E3D32] transition hover:bg-[#1E3D32] hover:text-white"
          >
            Editar
          </a>
          <button
            type="button"
            onClick={() => onAlternarStatus(pet.id)}
            className="rounded-full border border-cyan-600 px-4 py-1.5 text-xs font-semibold text-cyan-700 transition hover:bg-cyan-600 hover:text-white"
          >
            Marcar como {disponivel ? "adotado" : "disponível"}
          </button>
          <button
            type="button"
            onClick={() => onExcluir(pet.id)}
            className="px-2 py-1.5 text-xs font-semibold text-[#C15A2B] transition hover:underline"
          >
            Excluir
          </button>
        </div>
      </td>
    </tr>
  );
}
