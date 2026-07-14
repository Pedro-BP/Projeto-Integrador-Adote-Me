import Header from "../components/templates/Header";
import Footer from "../components/templates/Footer";
import Introducao from "../components/feed/Introducao";
import ListaPostagens from "../components/feed/ListaPostagens";

export default function Feed() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAF7EF] text-[#1C2620] font-[Inter,sans-serif] antialiased">
      <Header />
      <main className="flex-1">
        <Introducao />
        <ListaPostagens />
      </main>
      <Footer />
    </div>
  );
}
