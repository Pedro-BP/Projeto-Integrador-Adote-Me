import CadastroForm from "../components/cadastro/CadastroForm";
import AuthDecorativePanel from "../components/AuthDecorativePanel";

export default function Cadastro() {
  return (
    <div className="flex min-h-screen bg-[#FAF7EF] text-[#1C2620] font-[Inter,sans-serif] antialiased">
      <CadastroForm />
      <AuthDecorativePanel />
    </div>
  );
}
