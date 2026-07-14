import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/templates/Header";
import Footer from "../components/templates/Footer";
import FormularioPet from "../components/admin/FormularioPet";
import { buscarPet } from "../services/api";

export default function CadastrarPet() {
  const { id } = useParams();
  const [petInicial, setPetInicial] = useState(undefined);
  const [carregando, setCarregando] = useState(Boolean(id));
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!id) return;
    buscarPet(id)
      .then(setPetInicial)
      .catch((err) => setErro(err.message))
      .finally(() => setCarregando(false));
  }, [id]);

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF7EF] text-[#1C2620] font-[Inter,sans-serif] antialiased">
      <Header />
      <main className="flex-1">
        {carregando && (
          <p className="px-6 py-24 text-center text-[#46564B]">Carregando...</p>
        )}
        {!carregando && erro && (
          <p className="px-6 py-24 text-center text-[#C15A2B]">{erro}</p>
        )}
        {!carregando && !erro && <FormularioPet petInicial={petInicial} />}
      </main>
      <Footer />
    </div>
  );
}
