import Header from "../components/templates/Header";
import Footer from "../components/templates/Footer";
import FormularioPet from "../components/admin/FormularioPet";

export default function CadastrarPet() {
  return (
    <div className="bg-[#FAF7EF] text-[#1C2620] font-[Inter,sans-serif] antialiased">
      <Header />
      <FormularioPet />
      <Footer />
    </div>
  );
}
