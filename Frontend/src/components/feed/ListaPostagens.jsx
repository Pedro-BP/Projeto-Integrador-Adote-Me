import { useEffect, useState } from "react";
import CardPostagem from "./CardPostagem";
import { listarPostagens } from "../../services/api";

export default function ListaPostagens() {
  const [postagens, setPostagens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    listarPostagens()
      .then(setPostagens)
      .catch((err) => setErro(err.message))
      .finally(() => setCarregando(false));
  }, []);

  return (
    <section className="px-6 pb-20">
      <div className="mx-auto max-w-280">
        {carregando && (
          <p className="text-center text-[#46564B] dark:text-[#A8B0A8]">Carregando postagens...</p>
        )}

        {!carregando && erro && (
          <p className="text-center text-[#C15A2B]">{erro}</p>
        )}

        {!carregando && !erro && postagens.length === 0 && (
          <p className="text-center text-[#46564B] dark:text-[#A8B0A8]">
            Nenhuma postagem por enquanto.
          </p>
        )}

        {!carregando && !erro && postagens.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {postagens.map((postagem) => (
              <CardPostagem key={postagem.id} postagem={postagem} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
