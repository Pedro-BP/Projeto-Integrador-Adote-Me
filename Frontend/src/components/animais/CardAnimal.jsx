export default function CardAnimal({ animal }) {
  return (
    <div className="overflow-hidden rounded-[20px] border border-[#1E3D32]/[0.14] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <img
        src={animal.img}
        alt={animal.nome}
        className="h-64 w-full object-cover"
      />

      <div className="p-6">
        <h2 className="font-[Fraunces,serif] text-2xl font-bold text-[#1E3D32]">
          {animal.nome}
        </h2>

        <button className="mt-6 w-full rounded-full bg-cyan-600 py-3 font-semibold text-white transition hover:bg-stone-800">
          Ver mais
        </button>

        <button className="mt-3 w-full rounded-full border border-[#1E3D32] py-3 font-semibold text-[#1E3D32] transition hover:bg-cyan-600 hover:text-white">
          Adotar
        </button>
      </div>
    </div>
  );
}
