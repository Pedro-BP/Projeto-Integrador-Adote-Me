import Header from "../components/templates/Header";
import Footer from "../components/templates/Footer";
import PetHero from "../components/animal/PetHero";
import OtherPets from "../components/animal/OtherPets";

export default function Animal() {
  return (
    <div className="bg-[#FAF7EF] text-[#1C2620] font-[Inter,sans-serif] antialiased">
      <Header />
      <PetHero />
      <OtherPets />
      <Footer />
    </div>
  );
}
