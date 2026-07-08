import Header from "../components/templates/Header";
import Footer from "../components/templates/Footer";
import Introducao from "../components/feed/Introducao";
import ListaPostagens from "../components/feed/ListaPostagens";

export default function Feed() {
  return (
    <div className="bg-[#FAF7EF] text-[#1C2620] font-[Inter,sans-serif] antialiased">
      <Header />
      <Introducao />
      <ListaPostagens />
      <Footer />
    </div>
  );
}
