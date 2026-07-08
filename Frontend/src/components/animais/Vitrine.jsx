import CardAnimal from "./CardAnimal";

const Pets = [
  {
    id: 1,
    nome: "Fulaninho",
    img: "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",
  },
  {
    id: 2,
    nome: "Laila",
    img: "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",
  },
  {
    id: 3,
    nome: "Pudim",
    img: "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",
  },
];

export default function Vitrine() {
  return (
    <section className="px-6 pb-20">
      <div className="mx-auto grid max-w-280 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Pets.map((animal) => (
          <CardAnimal key={animal.id} animal={animal} />
        ))}
      </div>
    </section>
  );
}
