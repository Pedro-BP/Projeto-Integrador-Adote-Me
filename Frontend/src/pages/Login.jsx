import FormularioLogin from "../components/login/FormularioLogin";
import PainelDecorativo from "../components/templates/PainelDecorativo";

export default function Login() {
  return (
    <div className="flex min-h-screen bg-[#FAF7EF] text-[#1C2620] font-[Inter,sans-serif] antialiased">
      <FormularioLogin />
      <PainelDecorativo />
    </div>
  );
}
