export default function PainelDecorativo() {
  return (
    <div className="relative hidden w-1/2 items-center justify-center overflow-hidden bg-linear-to-br from-[#1E3D32] via-[#2F5A48] to-[#E3A63D] p-8 md:flex">
      <div className="relative h-full w-full overflow-hidden rounded-[28px] shadow-2xl">
        <img
          src="https://media.istockphoto.com/id/2180298512/pt/foto/happy-family-relaxing-on-sofa-embracing-golden-retriever-dog.jpg?s=612x612&w=0&k=20&c=D-0txCZ-GtyosYwRtwf-SIXqnuNs67mVEKmPkRkjRVw="
          alt="Família feliz abraçando um golden retriever no sofá"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-[#1C2620]/80 via-[#1C2620]/10 to-transparent p-8">
          <span className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 font-[IBM_Plex_Mono,monospace] text-[0.7rem] uppercase tracking-[0.08em] text-white">
            Resgate &amp; adoção responsável
          </span>
          <p className="font-[Fraunces,serif] text-2xl font-medium leading-snug text-white">
            "Um lar não está completo até que uma pata bata à porta."
          </p>
        </div>
      </div>
    </div>
  );
}
