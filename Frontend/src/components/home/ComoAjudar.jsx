const HELP_CARDS = [
  {
    title: "Adote",
    text: "Conheça os animais disponíveis e encontre um novo companheiro para a família.",
    cta: "Ver animais para adoção",
  },
  {
    title: "Entrega voluntaria",
    text: "Não pode mais cuidar do seu pet? Faça uma doação responsável. Nossa ONG ajudará a encontrar um novo lar seguro e cheio de carinho.",
    cta: "Fazer uma doação",
  },
];

export default function ComoAjudar() {
  return (
    <section id="ajudar" className="bg-cyan-50 px-6 py-24">
      <div className="mx-auto max-w-[1120px]">
        <div className="mb-12 max-w-xl">
          <h2 className="mb-3.5 font-[Fraunces,serif] text-3xl font-bold text-[#1E3D32] sm:text-[2.3rem]">
            Como você pode ajudar
          </h2>
          <p className="text-[#46564B]">
            Existem várias formas de apoiar o trabalho do instituto, escolha a que combina com você.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {HELP_CARDS.map((c) => (
            <div
              key={c.title}
              className="flex flex-col gap-3.5 rounded-[20px] border border-[#1E3D32]/[0.14] bg-white p-7"
            >
              <h3 className="font-[Fraunces,serif] text-xl text-[#1E3D32]">{c.title}</h3>
              <p className="flex-grow text-sm text-[#46564B]">{c.text}</p>
              <a href="#contato" className="text-sm font-semibold text-cyan-600 hover:underline">
                {c.cta} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
