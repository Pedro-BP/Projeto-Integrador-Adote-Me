import { Link } from "react-router-dom";
import { TIPO_LABEL, PORTE_LABEL } from "../../constants/pets";

export default function DestaquePet({ pet }) {
  const numeroLimpo = pet.numero ? pet.numero.replace(/\D/g, "") : "";
  const whatsappHref = numeroLimpo
    ? `https://wa.me/55${numeroLimpo}?text=${encodeURIComponent(
        `Olá! Vi o ${pet.nome} no Adote-Me e tenho interesse em adotá-lo(a).`,
      )}`
    : null;

  const fatos = [
    { label: "Espécie", value: TIPO_LABEL[pet.tipo] ?? pet.tipo },
    { label: "Porte", value: PORTE_LABEL[pet.porte] ?? pet.porte },
    { label: "Idade", value: pet.idade },
    {
      label: "Localização",
      value: [pet.bairro, pet.cidade].filter(Boolean).join(", "),
    },
  ].filter((f) => f.value);

  return (
    <section id="top" className="overflow-hidden px-6 pb-20 pt-12 md:pt-16">
      <div className="mx-auto max-w-280">
        <Link
          to="/animais"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-[#46564B] hover:text-[#1E3D32]"
        >
          ← Voltar para adoção
        </Link>

        <div className="grid items-center gap-12 md:grid-cols-[1fr_1.1fr]">
          <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[28px] bg-linear-to-br from-[#2F5A48] to-[#1E3D32]">
            {pet.foto_url && (
              <img
                src={pet.foto_url}
                alt={pet.nome}
                className="h-full w-full object-cover"
              />
            )}
            <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1.5 font-[IBM_Plex_Mono,monospace] text-[0.7rem] uppercase tracking-[0.08em] text-cyan-700">
              {pet.status === "disponivel"
                ? "Disponível para adoção"
                : "Adotado"}
            </span>
          </div>

          <div>
            <span className="mb-4 inline-flex items-center gap-2 font-[IBM_Plex_Mono,monospace] text-xs uppercase tracking-[0.12em] text-cyan-600">
              Ficha do animal
            </span>

            <h1 className="mb-5 font-[Fraunces,serif] text-4xl font-bold leading-[1.08] tracking-tight text-stone-800 sm:text-5xl">
              {pet.nome}
            </h1>

            <div className="mb-6 flex flex-wrap gap-2.5">
              {fatos.map((f) => (
                <span
                  key={f.label}
                  className="rounded-full bg-[#E7EEE5] px-3 py-1.5 font-[IBM_Plex_Mono,monospace] text-[0.7rem] uppercase tracking-wider text-[#1E3D32]"
                >
                  {f.value}
                </span>
              ))}
            </div>

            <p className="mb-8 max-w-[46ch] text-lg text-[#46564B]">
              {pet.historia
                ? `${pet.historia.split(".")[0]}. Conheça a história completa de ${pet.nome} e dê o primeiro passo para mudar a vida dele(a).`
                : `Conheça ${pet.nome} e dê o primeiro passo para mudar a vida dele(a).`}
            </p>

            <div className="flex flex-wrap gap-3.5">
              <a
                href="#fale-com-ong"
                className="inline-flex items-center justify-center rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-stone-800"
              >
                Quero adotar {pet.nome}
              </a>
              {whatsappHref && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-[#1E3D32] px-6 py-3 text-sm font-semibold text-[#1E3D32] transition-colors hover:bg-stone-800 hover:text-white"
                >
                  Falar no WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
