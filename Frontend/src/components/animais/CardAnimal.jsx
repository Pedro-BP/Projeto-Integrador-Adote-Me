import { Link } from "react-router-dom";

const FOTO_PLACEHOLDER =
  "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*";

export default function CardAnimal({ animal }) {
  return (
    <div className="overflow-hidden rounded-[20px] border border-[#1E3D32]/[0.14] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <img
        src={animal.foto_url || FOTO_PLACEHOLDER}
        alt={animal.nome}
        className="h-64 w-full object-cover"
      />

      <div className="p-6">
        <h2 className="font-[Fraunces,serif] text-2xl font-bold text-[#1E3D32]">
          {animal.nome}
        </h2>

        <Link
          to={`/animais/${animal.id}`}
          className="mt-6 block w-full rounded-full bg-cyan-600 py-3 text-center font-semibold text-white transition hover:bg-stone-800"
        >
          Ver mais
        </Link>
      </div>
    </div>
  );
}
