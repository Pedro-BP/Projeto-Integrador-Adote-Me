import Header from "../components/templates/Header";
import Footer from "../components/templates/Footer";
import Introducao from "../components/animais/Introducao";
import Vitrine from "../components/animais/Vitrine";

export default function Animais() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAF7EF] text-[#1C2620] font-[Inter,sans-serif] antialiased dark:bg-[#121815] dark:text-[#F5F3EA]">
      <Header />
      <main className="flex-1">
        <Introducao />
        <Vitrine />
      </main>
      <Footer />
    </div>
  );
}
