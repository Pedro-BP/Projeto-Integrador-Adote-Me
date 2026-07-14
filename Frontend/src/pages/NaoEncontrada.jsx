import { Link } from "react-router-dom";
import Header from "../components/templates/Header";
import Footer from "../components/templates/Footer";

export default function NaoEncontrada() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAF7EF] text-[#1C2620] font-[Inter,sans-serif] antialiased dark:bg-[#121815] dark:text-[#F5F3EA]">
      <Header />
      <main className="flex-1">
        <section className="px-6 py-24 text-center">
          <span className="font-[IBM_Plex_Mono,monospace] text-xs uppercase tracking-[0.12em] text-cyan-600">
            Erro 404
          </span>
          <h1 className="mt-3 font-[Fraunces,serif] text-4xl font-bold text-[#1E3D32] dark:text-[#EDEAE0]">
            Página não encontrada
          </h1>
          <p className="mx-auto mt-4 max-w-[46ch] text-[#46564B] dark:text-[#A8B0A8]">
            O endereço que você tentou acessar não existe ou foi movido.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-stone-800"
          >
            Voltar para o início
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
