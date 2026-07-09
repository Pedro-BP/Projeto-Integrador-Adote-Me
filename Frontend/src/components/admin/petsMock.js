const FOTO_MOCK =
  "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*";

export const TIPO_LABEL = { cachorro: "Cachorro", gato: "Gato" };
export const PORTE_LABEL = { pequeno: "Pequeno", medio: "Médio", grande: "Grande" };

export const PETS_INICIAIS = [
  {
    id: 1,
    nome: "Thor",
    tipo: "cachorro",
    porte: "medio",
    idade: "2 anos",
    cidade: "Tramandaí",
    bairro: "Centro",
    fotoUrl: FOTO_MOCK,
    historia:
      "Thor foi resgatado nas ruas do Centro de Tramandaí com uma pata machucada e sinais de maus-tratos. Hoje é um cachorro brincalhão, dócil e que adora crianças.",
    numero: "(51) 9101-3434",
    email: "adotemetramandai@gmail.com",
    status: "disponivel",
  },
  {
    id: 2,
    nome: "Mel",
    tipo: "cachorro",
    porte: "pequeno",
    idade: "1 ano",
    cidade: "Tramandaí",
    bairro: "Zona Nova",
    fotoUrl: FOTO_MOCK,
    historia:
      "Mel foi encontrada sozinha na Zona Nova, ainda filhote. É sociável, já vacinada e adora colo.",
    numero: "(51) 9101-3434",
    email: "adotemetramandai@gmail.com",
    status: "adotado",
  },
  {
    id: 3,
    nome: "Pandora",
    tipo: "gato",
    porte: "pequeno",
    idade: "8 meses",
    cidade: "Tramandaí",
    bairro: "Centro",
    fotoUrl: FOTO_MOCK,
    historia:
      "Pandora chegou ao abrigo ainda filhote. É brincalhona, sociável e já está vacinada.",
    numero: "(51) 9101-3434",
    email: "adotemetramandai@gmail.com",
    status: "disponivel",
  },
  {
    id: 4,
    nome: "Bento",
    tipo: "gato",
    porte: "medio",
    idade: "3 anos",
    cidade: "Tramandaí",
    bairro: "Vila Nova",
    fotoUrl: FOTO_MOCK,
    historia:
      "Bento é tranquilo, adora colo e ambientes calmos. Foi doado por uma família que se mudou de cidade.",
    numero: "(51) 9101-3434",
    email: "adotemetramandai@gmail.com",
    status: "adotado",
  },
  {
    id: 5,
    nome: "Pudim",
    tipo: "cachorro",
    porte: "grande",
    idade: "4 anos",
    cidade: "Tramandaí",
    bairro: "Centro",
    fotoUrl: FOTO_MOCK,
    historia:
      "Pudim é dócil e ótimo com crianças e outros pets. Já fez a primeira consulta no veterinário.",
    numero: "(51) 9101-3434",
    email: "adotemetramandai@gmail.com",
    status: "disponivel",
  },
];
