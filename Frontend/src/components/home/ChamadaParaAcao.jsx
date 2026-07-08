export default function ChamadaParaAcao() {
  return (
    <div
      id="doar"
      className="relative mx-6 mb-24 overflow-hidden rounded-[28px] bg-cyan-700 px-8 py-14 text-center text-white"
    >
      <h2 className="relative mb-3 font-[Fraunces,serif] text-3xl font-bold sm:text-[2.2rem]">
        Encontre um novo melhor amigo
      </h2>
      <p className="relative mx-auto mb-7 max-w-[46ch] text-white/80">
        Cada adoção transforma duas vidas: a do animal e a da família que o
        recebe. Conheça nossos pets disponíveis e ofereça um lar cheio de amor.
      </p>
      <div className="relative flex flex-wrap justify-center gap-3.5">
        <a
          href="#contato"
          className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1E3D32] transition-colors hover:bg-cyan-600 hover:text-white"
        >
          Ver pets disponíveis
        </a>{" "}
      </div>
    </div>
  );
}
