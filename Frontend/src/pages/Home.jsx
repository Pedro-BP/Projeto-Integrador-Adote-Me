import Header from "../components/templates/Header";
import Footer from "../components/templates/Footer";
import Introducao from "../components/home/Introducao";
import Estatisticas from "../components/home/Estatisticas";
import Sobre from "../components/home/Sobre";
import ComoAjudar from "../components/home/ComoAjudar";
import ResgatesRecentes from "../components/home/ResgatesRecentes";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAF7EF] text-[#1C2620] font-[Inter,sans-serif] antialiased dark:bg-[#121815] dark:text-[#F5F3EA]">
      <Header />
      <main className="flex-1">
        <Introducao />
        <Estatisticas />
        <Sobre />
        <ComoAjudar />
        <ResgatesRecentes />
      </main>
      <Footer />
    </div>
  );
}
