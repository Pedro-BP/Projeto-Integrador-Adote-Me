import { Link } from "react-router-dom";

export default function Introducao() {
  return (
    <section id="top" className="overflow-hidden px-6 pb-24 pt-16 md:pt-20">
      <div className="mx-auto grid max-w-280 items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span className="mb-5 inline-flex items-center gap-2 font-[IBM_Plex_Mono,monospace] text-xs uppercase tracking-[0.12em] text-cyan-600">
            Conectando pets a novos lares
          </span>

          <h1 className="mb-5 max-w-xl font-[Fraunces,serif] text-[2.3rem] font-bold leading-[1.08] tracking-tight text-stone-800 sm:text-5xl lg:text-[3.6rem] dark:text-[#EDEAE0]">
            Cada adoção é{" "}
            <em className="font-medium not-italic text-cyan-500">
              um novo começo.
            </em>
          </h1>

          <p className="mb-8 max-w-[46ch] text-lg text-[#46564B] text-justify dark:text-[#A8B0A8]">
            Acreditamos que todo animal merece um lar. Facilitamos a adoção
            responsável, aproximando pets de famílias que possam oferecer amor e
            cuidados por toda a vida
          </p>

          <div className="flex flex-wrap gap-3.5">
            <Link
              to="/animais"
              className="inline-flex items-center justify-center rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-stone-800"
            >
              Quero adotar
            </Link>
          </div>
        </div>

        <div className="relative flex aspect-4/5 items-center justify-center overflow-hidden rounded-[28px] bg-linear-to-br from-[#1E3D32] via-[#2F5A48] to-[#E3A63D]">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgtDfuNiXcgKIie5a9VpSax3IdT1Jeu75J1Vk-atT7Xg&s=10"
            alt="Pet"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-[#1C2620]/55 px-4 py-3.5 font-[IBM_Plex_Mono,monospace] text-sm text-white backdrop-blur-sm">
            Do Adote-Me para o colo de uma família.
          </div>
        </div>
      </div>
    </section>
  );
}
