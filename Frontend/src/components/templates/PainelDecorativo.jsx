export default function PainelDecorativo() {
  return (
    <div className="relative hidden w-1/2 items-center justify-center overflow-hidden bg-gradient-to-br from-[#1E3D32] via-[#2F5A48] to-[#E3A63D] md:flex">
      <div className="absolute inset-8 flex flex-col justify-end rounded-[28px] bg-[#1C2620]/25 p-8 backdrop-blur-sm">
        <span className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 font-[IBM_Plex_Mono,monospace] text-[0.7rem] uppercase tracking-[0.08em] text-white">
          Resgate &amp; adoção responsável
        </span>
        <p className="font-[Fraunces,serif] text-2xl font-medium leading-snug text-white">
          "Frase aleatória e super generica para comover os usuários."
        </p>
      </div>
    </div>
  );
}
