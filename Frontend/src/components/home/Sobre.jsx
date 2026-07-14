const proposta = [
  "- Acolhimento responsável",
  "- Animais disponíveis para adoção",
  "- Adoção consciente",
];

export default function Sobre() {
  return (
    <section id="sobre" className="px-6 py-24">
      <div className="mx-auto grid max-w-280 gap-10 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="mb-6 font-[Fraunces,serif] text-3xl font-bold text-[#1E3D32] sm:text-[2.3rem] dark:text-[#EDEAE0]">
            Sobre o Adote-Me
          </h2>
          <p className="mb-4 text-[#46564B] text-justify dark:text-[#A8B0A8]">
            No Adote-Me, acreditamos que todo animal merece uma segunda chance.
            Nossa missão é conectar cães e gatos que aguardam por um lar a
            pessoas dispostas a oferecer amor, cuidado e responsabilidade. Por
            meio da nossa plataforma, facilitamos o processo de adoção
            responsável, aproximando protetores, ONGs e futuros tutores de forma
            simples, segura e organizada.
          </p>
          <p className="mb-4 text-[#46564B] text-justify dark:text-[#A8B0A8]">
            Mais do que um site de adoção, queremos incentivar a conscientização
            sobre a importância de combater o abandono e promover a guarda
            responsável. Cada adoção representa uma nova história, um recomeço e
            a oportunidade de transformar a vida de um animal e de uma família.
            Junte-se ao Adote-Me, encontre seu novo melhor amigo e faça parte
            dessa corrente de solidariedade e amor pelos animais.
          </p>
          <ul className="mt-6 grid gap-3.5">
            {proposta.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[0.95rem] text-[#1C2620] dark:text-[#F5F3EA]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="aspect-square overflow-hidden rounded-3xl bg-linear-to-br from-[#E3A63D] to-[#C15A2B]">
          <img
            src="https://crmvsp.gov.br/wp-content/uploads/2023/07/04.07.2023_Cuidados-com-caes-e-gatos-no-inverno_veja-como-proteger-seus-pets_AdobeStock_194955015-1024x683.jpeg"
            alt="Cães e gatos recebendo cuidados"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
