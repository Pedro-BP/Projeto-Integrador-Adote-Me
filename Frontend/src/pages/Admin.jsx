import Header from "../components/templates/Header";
import Footer from "../components/templates/Footer";
import Introducao from "../components/admin/Introducao";
import ListaPets from "../components/admin/ListaPets";

export default function Admin() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAF7EF] text-[#1C2620] font-[Inter,sans-serif] antialiased">
      <Header />
      <main className="flex-1">
        <Introducao />
        <ListaPets />
      </main>
      <Footer />
    </div>
  );
}
