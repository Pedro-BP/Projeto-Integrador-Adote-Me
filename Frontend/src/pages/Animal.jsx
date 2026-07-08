import Header from "../components/templates/Header";
import Footer from "../components/templates/Footer";
import DestaquePet from "../components/animal/DestaquePet";
import OutrosPets from "../components/animal/OutrosPets";

export default function Animal() {
  return (
    <div className="bg-[#FAF7EF] text-[#1C2620] font-[Inter,sans-serif] antialiased">
      <Header />
      <DestaquePet />
      <OutrosPets />
      <Footer />
    </div>
  );
}
