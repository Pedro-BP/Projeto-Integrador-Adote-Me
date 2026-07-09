import { useParams } from "react-router-dom";
import Header from "../components/templates/Header";
import Footer from "../components/templates/Footer";
import FormularioPet from "../components/admin/FormularioPet";
import { PETS_INICIAIS } from "../components/admin/petsMock";

export default function CadastrarPet() {
  const { id } = useParams();
  const petInicial = id
    ? PETS_INICIAIS.find((pet) => String(pet.id) === id)
    : undefined;

  return (
    <div className="bg-[#FAF7EF] text-[#1C2620] font-[Inter,sans-serif] antialiased">
      <Header />
      <FormularioPet petInicial={petInicial} />
      <Footer />
    </div>
  );
}
