import { Link } from "react-router-dom";
import { FOTO_PLACEHOLDER } from "../../constants/pets";
import { resolverFotoUrl } from "../../services/api";

export default function CardAnimal({ animal }) {
  return (
    <div className="overflow-hidden rounded-[20px] border border-[#1E3D32]/[0.14] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-[#EDEAE0]/[0.14] dark:bg-[#1A2420]">
      <img
        src={resolverFotoUrl(animal.foto) || FOTO_PLACEHOLDER}
        alt={animal.nome}
        className="h-64 w-full object-cover"
      />

      <div className="p-6">
        <h2 className="font-[Fraunces,serif] text-2xl font-bold text-[#1E3D32] dark:text-[#EDEAE0]">
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
