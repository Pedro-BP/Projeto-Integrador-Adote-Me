import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/templates/Header";
import Footer from "../components/templates/Footer";
import DestaquePet from "../components/animal/DestaquePet";
import OutrosPets from "../components/animal/OutrosPets";
import { buscarPet } from "../services/api";

export default function Animal() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    setCarregando(true);
    setErro("");
    buscarPet(id)
      .then(setPet)
      .catch((err) => setErro(err.message))
      .finally(() => setCarregando(false));
  }, [id]);

  return (
    <div className="bg-[#FAF7EF] text-[#1C2620] font-[Inter,sans-serif] antialiased">
      <Header />
      {carregando && (
        <p className="px-6 py-24 text-center text-[#46564B]">Carregando...</p>
      )}
      {!carregando && erro && (
        <p className="px-6 py-24 text-center text-[#C15A2B]">{erro}</p>
      )}
      {!carregando && !erro && pet && (
        <>
          <DestaquePet pet={pet} />
          <OutrosPets petAtualId={pet.id} />
        </>
      )}
      <Footer />
    </div>
  );
}
