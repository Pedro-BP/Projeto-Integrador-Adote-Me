import { useState } from "react";

export default function CardPostagem({ postagem }) {
  const [curtido, setCurtido] = useState(false);
  const [curtidas, setCurtidas] = useState(postagem.curtidas);

  function handleCurtir() {
    setCurtidas((c) => (curtido ? c - 1 : c + 1));
    setCurtido((v) => !v);
  }

  return (
    <div className="overflow-hidden rounded-[20px] border border-[#1E3D32]/[0.14] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <img
        src={postagem.fotoUrl}
        alt={`${postagem.petNome} com a nova família`}
        className="h-64 w-full object-cover"
      />

      <div className="p-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="font-[Fraunces,serif] text-2xl font-bold text-[#1E3D32]">
            {postagem.petNome}
          </h2>
          <span className="shrink-0 rounded-full bg-[#E7EEE5] px-2.5 py-1 font-[IBM_Plex_Mono,monospace] text-[0.66rem] uppercase tracking-wider text-[#1E3D32]">
            {postagem.criadoEm}
          </span>
        </div>

        <p className="mb-2 font-[IBM_Plex_Mono,monospace] text-[0.7rem] uppercase tracking-wider text-cyan-600">
          Adotado(a) por {postagem.autorNome}
        </p>

        <p className="mb-6 text-[#46564B]">{postagem.relato}</p>

        <button
          type="button"
          onClick={handleCurtir}
          aria-pressed={curtido}
          className={`flex w-full items-center justify-center gap-2 rounded-full border py-3 font-semibold transition ${
            curtido
              ? "border-[#C15A2B] bg-[#C15A2B] text-white"
              : "border-[#1E3D32] text-[#1E3D32] hover:bg-[#1E3D32] hover:text-white"
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
