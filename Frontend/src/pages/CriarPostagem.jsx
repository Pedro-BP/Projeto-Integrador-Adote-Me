import Header from "../components/templates/Header";
import Footer from "../components/templates/Footer";
import FormularioPostagem from "../components/feed/FormularioPostagem";

export default function CriarPostagem() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAF7EF] text-[#1C2620] font-[Inter,sans-serif] antialiased">
      <Header />
      <main className="flex-1">
        <FormularioPostagem />
      </main>
      <Footer />
    </div>
  );
}
