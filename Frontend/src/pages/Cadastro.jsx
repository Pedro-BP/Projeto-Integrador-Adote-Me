import FormularioCadastro from "../components/cadastro/FormularioCadastro";
import PainelDecorativo from "../components/templates/PainelDecorativo";

export default function Cadastro() {
  return (
    <div className="flex min-h-screen bg-[#FAF7EF] text-[#1C2620] font-[Inter,sans-serif] antialiased dark:bg-[#121815] dark:text-[#F5F3EA]">
      <FormularioCadastro />
      <PainelDecorativo />
    </div>
  );
}
