import Header from "../components/templates/Header";
import Footer from "../components/templates/Footer";
import Introducao from "../components/home/Introducao";
import Estatisticas from "../components/home/Estatisticas";
import Sobre from "../components/home/Sobre";
import ComoAjudar from "../components/home/ComoAjudar";
import ResgatesRecentes from "../components/home/ResgatesRecentes";
import ChamadaParaAcao from "../components/home/ChamadaParaAcao";

export default function Home() {
  return (
    <div className="bg-[#FAF7EF] text-[#1C2620] font-[Inter,sans-serif] antialiased">
      <Header />
      <Introducao />
      <Estatisticas />
      <Sobre />
      <ComoAjudar />
      <ResgatesRecentes />
      <ChamadaParaAcao />
      <Footer />
    </div>
  );
}
