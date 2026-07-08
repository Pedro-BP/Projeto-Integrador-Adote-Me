import Header from "../components/templates/Header";
import Footer from "../components/templates/Footer";
import Introducao from "../components/animais/Introducao";
import Vitrine from "../components/animais/Vitrine";

export default function Animais() {
  return (
    <div className="bg-[#FAF7EF] text-[#1C2620] font-[Inter,sans-serif] antialiased">
      <Header />
      <Introducao />
      <Vitrine />
      <Footer />
    </div>
  );
}
