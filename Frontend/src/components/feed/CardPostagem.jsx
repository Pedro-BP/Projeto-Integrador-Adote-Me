import { useState } from "react";
import { curtirPostagem, resolverFotoUrl } from "../../services/api";
import { FOTO_PLACEHOLDER } from "../../constants/pets";

function formatarTempoRelativo(dataSql) {
  const data = new Date(dataSql.replace(" ", "T"));
  const diffHoras = Math.floor((Date.now() - data.getTime()) / (1000 * 60 * 60));

  if (diffHoras < 1) return "agora mesmo";
  if (diffHoras < 24) return `há ${diffHoras} hora${diffHoras === 1 ? "" : "s"}`;

  const diffDias = Math.floor(diffHoras / 24);
  if (diffDias < 30) return `há ${diffDias} dia${diffDias === 1 ? "" : "s"}`;

  const diffMeses = Math.floor(diffDias / 30);
  return `há ${diffMeses} mês${diffMeses === 1 ? "" : "es"}`;
}

export default function CardPostagem({ postagem }) {
  const [curtido, setCurtido] = useState(false);
  const [curtidas, setCurtidas] = useState(Number(postagem.curtidas));
  const [carregando, setCarregando] = useState(false);

  async function handleCurtir() {
    if (curtido || carregando) return;
    setCarregando(true);
    try {
      await curtirPostagem(postagem.id);
      setCurtidas((c) => c + 1);
      setCurtido(true);
    } catch {
      // curtida é best-effort; sem feedback de erro pra não travar a UX
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-[20px] border border-[#1E3D32]/[0.14] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-[#EDEAE0]/[0.14] dark:bg-[#1A2420]">
      <img
        src={resolverFotoUrl(postagem.foto_url) || FOTO_PLACEHOLDER}
        alt={`${postagem.pet_nome} com a nova família`}
        className="h-64 w-full object-cover"
      />

      <div className="p-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="font-[Fraunces,serif] text-2xl font-bold text-[#1E3D32] dark:text-[#EDEAE0]">
            {postagem.pet_nome}
          </h2>
          <span className="shrink-0 rounded-full bg-[#E7EEE5] px-2.5 py-1 font-[IBM_Plex_Mono,monospace] text-[0.66rem] uppercase tracking-wider text-[#1E3D32] dark:bg-[#24332B] dark:text-[#EDEAE0]">
            {formatarTempoRelativo(postagem.criado_em)}
          </span>
        </div>

        <p className="mb-2 font-[IBM_Plex_Mono,monospace] text-[0.7rem] uppercase tracking-wider text-cyan-600">
          Adotado(a) por {postagem.usuario_nome}
        </p>

        <p className="mb-6 text-[#46564B] dark:text-[#A8B0A8]">{postagem.relato}</p>

        <button
          type="button"
          onClick={handleCurtir}
          disabled={curtido || carregando}
          aria-pressed={curtido}
          className={`flex w-full items-center justify-center gap-2 rounded-full border py-3 font-semibold transition disabled:cursor-default ${
            curtido
              ? "border-[#C15A2B] bg-[#C15A2B] text-white"
              : "border-[#1E3D32] text-[#1E3D32] hover:bg-[#1E3D32] hover:text-white dark:border-[#EDEAE0] dark:text-[#EDEAE0] dark:hover:bg-[#EDEAE0] dark:hover:text-[#121815]"
          }`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={curtido ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              d="M12 21s-7.5-4.6-10-9.1C.5 8.6 2 5 5.5 5c2 0 3.5 1.2 4.5 2.6C11 6.2 12.5 5 14.5 5 18 5 19.5 8.6 22 11.9 19.5 16.4 12 21 12 21z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {curtidas} curtida{curtidas === 1 ? "" : "s"}
        </button>
      </div>
    </div>
  );
}
