import { useState } from "react";

export default function Animais() {
    const [animais] = useState([
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
        }
    ]);
    

    return (
        <div className="bg-[#FAF7EF] min-h-screen font-[Inter,sans-serif]">
            <section className="px-6 pt-16 pb-8">
                <div className="mx-auto max-w-[1120px]">
                    <span className="font-[IBM_Plex_Mono,monospace] text-xs uppercase tracking-[0.12em] text-cyan-600">
                        Adoção responsável
                    </span>

                    <h1 className="mt-3 font-[Fraunces,serif] text-5xl font-bold text-[#1E3D32]">
                        Animais disponíveis
                    </h1>

                    <p className="mt-4 max-w-2xl text-[#46564B]">
                        Conheça os animais que aguardam por um novo lar.
                    </p>
                </div>
            </section>
            <section className="px-6 pb-20">
                <div className="mx-auto grid max-w-[1120px] gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {animais.map((animal) => (
                        <div
                            key={animal.id}
                            className="overflow-hidden rounded-[20px] border border-[#1E3D32]/[0.14] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                        >
                            <img
                                src={animal.img}
                                alt={animal.nome}
                                className="h-64 w-full object-cover"
                            />

                            <div className="p-6">
                                <h2 className="font-[Fraunces,serif] text-2xl font-bold text-[#1E3D32]">
                                    {animal.nome}
                                </h2>

                                <button className="mt-6 w-full rounded-full bg-cyan-600 py-3 font-semibold text-white transition hover:bg-stone-800">
                                    Ver mais
                                </button>

                                <button className="mt-3 w-full rounded-full border border-[#1E3D32] py-3 font-semibold text-[#1E3D32] transition hover:bg-cyan-600 hover:text-white">
                                    Adotar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}