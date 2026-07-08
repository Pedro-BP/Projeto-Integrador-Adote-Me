import CardPostagem from "./CardPostagem";

const POSTAGENS = [
  {
    id: 1,
    petNome: "Mel",
    autorNome: "Família Medeiros",
    fotoUrl:
      "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",
    relato:
      "A Mel completou um mês com a gente e já é dona da casa. Adora dormir no sofá e brincar com as crianças no quintal.",
    curtidas: 34,
    criadoEm: "há 3 dias",
  },
  {
    id: 2,
    petNome: "Thor",
    autorNome: "Camila Ribeiro",
    fotoUrl:
      "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",
    relato:
      "Ele chegou tímido, mas hoje corre pra me receber na porta todo dia. Muito obrigada ao Adote-Me por essa conexão!",
    curtidas: 21,
    criadoEm: "há 1 semana",
  },
  {
    id: 3,
    petNome: "Pudim",
    autorNome: "João Vitor",
    fotoUrl:
      "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",
    relato:
      "Já fez o primeiro banho, a primeira consulta no veterinário e ganhou uma cama nova. Vida de rei agora.",
    curtidas: 12,
    criadoEm: "há 2 semanas",
  },
];

export default function ListaPostagens() {
  return (
    <section className="px-6 pb-20">
      <div className="mx-auto grid max-w-280 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {POSTAGENS.map((postagem) => (
          <CardPostagem key={postagem.id} postagem={postagem} />
        ))}
      </div>
    </section>
  );
}
