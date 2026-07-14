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
    let cancelado = false;

    async function carregarPet() {
      setCarregando(true);
      setErro("");
      try {
        const resultado = await buscarPet(id);
        if (!cancelado) setPet(resultado);
      } catch (err) {
        if (!cancelado) setErro(err.message);
      } finally {
        if (!cancelado) setCarregando(false);
      }
    }

    carregarPet();
    return () => {
      cancelado = true;
    };
  }, [id]);

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF7EF] text-[#1C2620] font-[Inter,sans-serif] antialiased dark:bg-[#121815] dark:text-[#F5F3EA]">
      <Header />
      <main className="flex-1">
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
      </main>
      <Footer />
    </div>
  );
}
