import { Link } from "react-router-dom";

export default function Introducao() {
  return (
    <section className="px-6 pt-16 pb-8">
      <div className="mx-auto flex max-w-280 flex-wrap items-end justify-between gap-6">
        <div>
          <span className="font-[IBM_Plex_Mono,monospace] text-xs uppercase tracking-[0.12em] text-cyan-600">
            Área administrativa
          </span>

          <h1 className="mt-3 font-[Fraunces,serif] text-5xl font-bold text-[#1E3D32] dark:text-[#EDEAE0]">
            Pets cadastrados
          </h1>

          <p className="mt-4 max-w-[46ch] text-[#46564B] dark:text-[#A8B0A8]">
            Cadastre novos pets, atualize informações e marque adoções
            concluídas.
          </p>
        </div>

        <Link
          to="/admin/cadastrar-pet"
          className="inline-flex items-center justify-center rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-stone-800"
        >
          + Cadastrar pet
        </Link>
      </div>
    </section>
  );
}
