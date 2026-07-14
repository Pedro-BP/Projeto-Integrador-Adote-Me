import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listarPets, criarPostagem } from "../../services/api";

export default function FormularioPostagem() {
  const [pets, setPets] = useState([]);
  const [carregandoPets, setCarregandoPets] = useState(true);
  const [petId, setPetId] = useState("");
  const [arquivoFoto, setArquivoFoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [relato, setRelato] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    listarPets({ status: "adotado" })
      .then(setPets)
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
      await criarPostagem({ pet_id: petId, foto: arquivoFoto, relato });
      navigate("/feed");
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  function handleArquivoChange(e) {
    const arquivo = e.target.files?.[0] ?? null;
    setArquivoFoto(arquivo);
    setPreviewUrl(arquivo ? URL.createObjectURL(arquivo) : null);
  }

  return (
    <section className="px-6 pb-20 pt-12 md:pt-16">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/feed"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-[#46564B] hover:text-[#1E3D32] dark:text-[#A8B0A8] dark:hover:text-[#EDEAE0]"
        >
          ← Voltar para o feed
        </Link>

        <div className="rounded-[20px] border border-[#1E3D32]/[0.14] bg-white p-8 sm:p-10 dark:border-[#EDEAE0]/[0.14] dark:bg-[#1A2420]">
          <span className="font-[IBM_Plex_Mono,monospace] text-xs uppercase tracking-[0.12em] text-cyan-600">
            Pós-adoção
          </span>

          <h1 className="mb-6 mt-3 font-[Fraunces,serif] text-3xl font-bold text-[#1E3D32] sm:text-4xl dark:text-[#EDEAE0]">
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
            <p className="text-[#46564B] dark:text-[#A8B0A8]">
              Nenhum pet marcado como adotado ainda. Assim que um pet for
              adotado, ele aparece aqui pra você contar a história.
            </p>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="grid gap-5">
              <div>
                <label
                  htmlFor="petId"
                  className="mb-1.5 block text-sm font-medium text-[#1C2620] dark:text-[#F5F3EA]"
                >
                  Qual pet você adotou?
                </label>
                <select
                  id="petId"
                  required
                  value={petId}
                  onChange={(e) => setPetId(e.target.value)}
                  disabled={carregandoPets}
                  className="w-full rounded-xl border border-[#1E3D32]/18 bg-white px-4 py-3 text-[#1C2620] outline-none transition-colors focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20 dark:border-[#EDEAE0]/18 dark:bg-[#1A2420] dark:text-[#F5F3EA]"
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
                  htmlFor="foto"
                  className="mb-1.5 block text-sm font-medium text-[#1C2620] dark:text-[#F5F3EA]"
                >
                  Foto (opcional)
                </label>
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Pré-visualização da foto"
                    className="mb-3 h-40 w-40 rounded-xl object-cover"
                  />
                )}
                <input
                  id="foto"
                  type="file"
                  accept="image/*"
                  onChange={handleArquivoChange}
                  className="w-full rounded-xl border border-[#1E3D32]/18 bg-white px-4 py-3 text-[#1C2620] outline-none transition-colors file:mr-4 file:rounded-full file:border-0 file:bg-cyan-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20 dark:border-[#EDEAE0]/18 dark:bg-[#1A2420] dark:text-[#F5F3EA]"
                />
              </div>

              <div>
                <label
                  htmlFor="relato"
                  className="mb-1.5 block text-sm font-medium text-[#1C2620] dark:text-[#F5F3EA]"
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
                  className="w-full resize-none rounded-xl border border-[#1E3D32]/18 bg-white px-4 py-3 text-[#1C2620] outline-none transition-colors placeholder:text-[#46564B]/60 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20 dark:border-[#EDEAE0]/18 dark:bg-[#1A2420] dark:text-[#F5F3EA] dark:placeholder:text-[#A8B0A8]/60"
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
