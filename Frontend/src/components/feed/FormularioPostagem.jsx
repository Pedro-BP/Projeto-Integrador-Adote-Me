import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listarPets, criarPostagem } from "../../services/api";

export default function FormularioPostagem() {
  const [pets, setPets] = useState([]);
  const [carregandoPets, setCarregandoPets] = useState(true);
  const [petId, setPetId] = useState("");
  const [fotoUrl, setFotoUrl] = useState("");
  const [relato, setRelato] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    listarPets()
      .then((todos) => setPets(todos.filter((p) => p.status === "adotado")))
      .catch(() => setPets([]))
      .finally(() => setCarregandoPets(false));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    if (!petId || !relato.trim()) {
      setErro("Escolha o pet e conte como ele está.");
      return;
    }

    setCarregando(true);
    try {
      await criarPostagem({ pet_id: petId, foto_url: fotoUrl, relato });
      navigate("/feed");
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <section className="px-6 pb-20 pt-12 md:pt-16">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/feed"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-[#46564B] hover:text-[#1E3D32]"
        >
          ← Voltar para o feed
        </Link>

        <div className="rounded-[20px] border border-[#1E3D32]/[0.14] bg-white p-8 sm:p-10">
          <span className="font-[IBM_Plex_Mono,monospace] text-xs uppercase tracking-[0.12em] text-cyan-600">
            Pós-adoção
          </span>

          <h1 className="mb-6 mt-3 font-[Fraunces,serif] text-3xl font-bold text-[#1E3D32] sm:text-4xl">
            Compartilhar minha adoção
          </h1>

          {erro && (
            <div
              role="alert"
              className="mb-5 rounded-xl border border-[#C15A2B]/30 bg-[#C15A2B]/10 px-4 py-3 text-sm text-[#C15A2B]"
            >
              {erro}
            </div>
          )}

          {!carregandoPets && pets.length === 0 ? (
            <p className="text-[#46564B]">
              Nenhum pet marcado como adotado ainda. Assim que um pet for
              adotado, ele aparece aqui pra você contar a história.
            </p>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="grid gap-5">
              <div>
                <label
                  htmlFor="petId"
                  className="mb-1.5 block text-sm font-medium text-[#1C2620]"
                >
                  Qual pet você adotou?
                </label>
                <select
                  id="petId"
                  required
                  value={petId}
                  onChange={(e) => setPetId(e.target.value)}
                  disabled={carregandoPets}
                  className="w-full rounded-xl border border-[#1E3D32]/18 bg-white px-4 py-3 text-[#1C2620] outline-none transition-colors focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20"
                >
                  <option value="">
                    {carregandoPets ? "Carregando..." : "Selecione um pet"}
                  </option>
                  {pets.map((pet) => (
                    <option key={pet.id} value={pet.id}>
                      {pet.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="fotoUrl"
                  className="mb-1.5 block text-sm font-medium text-[#1C2620]"
                >
                  URL da foto (opcional)
                </label>
                <input
                  id="fotoUrl"
                  type="url"
                  value={fotoUrl}
                  onChange={(e) => setFotoUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full rounded-xl border border-[#1E3D32]/18 bg-white px-4 py-3 text-[#1C2620] outline-none transition-colors placeholder:text-[#46564B]/60 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20"
                />
              </div>

              <div>
                <label
                  htmlFor="relato"
                  className="mb-1.5 block text-sm font-medium text-[#1C2620]"
                >
                  Como ele está?
                </label>
                <textarea
                  id="relato"
                  required
                  rows={5}
                  value={relato}
                  onChange={(e) => setRelato(e.target.value)}
                  placeholder="Conte como está a vida do seu novo pet."
                  className="w-full resize-none rounded-xl border border-[#1E3D32]/18 bg-white px-4 py-3 text-[#1C2620] outline-none transition-colors placeholder:text-[#46564B]/60 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20"
                />
              </div>

              <button
                type="submit"
                disabled={carregando}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-stone-800 disabled:pointer-events-none disabled:opacity-60"
              >
                {carregando ? "Publicando..." : "Publicar"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
