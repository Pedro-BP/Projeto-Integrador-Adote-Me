import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  criarPet,
  atualizarPet,
  atualizarFotoPet,
  resolverFotoUrl,
} from "../../services/api";

const form = {
  nome: "",
  tipo: "cachorro",
  porte: "pequeno",
  idade: "",
  cidade: "",
  bairro: "",
  historia: "",
  numero: "",
  email: "",
};

export default function FormularioPet({ petInicial }) {
  const modoEdicao = Boolean(petInicial);
  const [campos, setCampos] = useState(() => ({
    ...form,
    ...(petInicial &&
      Object.fromEntries(
        Object.entries(petInicial).filter(
          ([, v]) => v !== null && v !== undefined,
        ),
      )),
  }));
  const [arquivoFoto, setArquivoFoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(() =>
    resolverFotoUrl(petInicial?.foto),
  );
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  function atualizarCampo(campo) {
    return (e) => setCampos((atual) => ({ ...atual, [campo]: e.target.value }));
  }

  function handleArquivoChange(e) {
    const arquivo = e.target.files?.[0] ?? null;
    setArquivoFoto(arquivo);
    setPreviewUrl(
      arquivo ? URL.createObjectURL(arquivo) : resolverFotoUrl(petInicial?.foto),
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    const obrigatorios = ["nome", "idade", "cidade", "bairro", "historia"];
    const faltando = obrigatorios.some((campo) => !campos[campo].trim());
    if (faltando) {
      setErro("Preencha todos os campos obrigatórios para continuar.");
      return;
    }

    const dados = {
      nome: campos.nome,
      tipo: campos.tipo,
      porte: campos.porte,
      idade: campos.idade,
      cidade: campos.cidade,
      bairro: campos.bairro,
      historia: campos.historia,
      numero: campos.numero,
      email: campos.email,
    };

    setCarregando(true);
    try {
      if (modoEdicao) {
        await atualizarPet(petInicial.id, dados);
        if (arquivoFoto) {
          await atualizarFotoPet(petInicial.id, arquivoFoto);
        }
      } else {
        await criarPet({ ...dados, foto: arquivoFoto });
      }
      navigate("/admin");
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
          to="/admin"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-[#46564B] hover:text-[#1E3D32] dark:text-[#A8B0A8] dark:hover:text-[#EDEAE0]"
        >
          ← Voltar para o painel
        </Link>

        <div className="rounded-[20px] border border-[#1E3D32]/[0.14] bg-white p-8 sm:p-10 dark:border-[#EDEAE0]/[0.14] dark:bg-[#1A2420]">
          <span className="font-[IBM_Plex_Mono,monospace] text-xs uppercase tracking-[0.12em] text-cyan-600">
            Área administrativa
          </span>

          <h1 className="mb-6 mt-3 font-[Fraunces,serif] text-3xl font-bold text-[#1E3D32] sm:text-4xl dark:text-[#EDEAE0]">
            {modoEdicao ? "Editar pet" : "Cadastrar novo pet"}
          </h1>

          {erro && (
            <div
              role="alert"
              className="mb-5 rounded-xl border border-[#C15A2B]/30 bg-[#C15A2B]/10 px-4 py-3 text-sm text-[#C15A2B]"
            >
              {erro}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="grid gap-5">
            <div>
              <label
                htmlFor="nome"
                className="mb-1.5 block text-sm font-medium text-[#1C2620] dark:text-[#F5F3EA]"
              >
                Nome do pet
              </label>
              <input
                id="nome"
                type="text"
                required
                value={campos.nome}
                onChange={atualizarCampo("nome")}
                placeholder="Ex: Thor"
                className="w-full rounded-xl border border-[#1E3D32]/18 bg-white px-4 py-3 text-[#1C2620] outline-none transition-colors placeholder:text-[#46564B]/60 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20 dark:border-[#EDEAE0]/18 dark:bg-[#1A2420] dark:text-[#F5F3EA] dark:placeholder:text-[#A8B0A8]/60"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="tipo"
                  className="mb-1.5 block text-sm font-medium text-[#1C2620] dark:text-[#F5F3EA]"
                >
                  Espécie
                </label>
                <select
                  id="tipo"
                  value={campos.tipo}
                  onChange={atualizarCampo("tipo")}
                  className="w-full rounded-xl border border-[#1E3D32]/18 bg-white px-4 py-3 text-[#1C2620] outline-none transition-colors focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20 dark:border-[#EDEAE0]/18 dark:bg-[#1A2420] dark:text-[#F5F3EA]"
                >
                  <option value="cachorro">Cachorro</option>
                  <option value="gato">Gato</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="porte"
                  className="mb-1.5 block text-sm font-medium text-[#1C2620] dark:text-[#F5F3EA]"
                >
                  Porte
                </label>
                <select
                  id="porte"
                  value={campos.porte}
                  onChange={atualizarCampo("porte")}
                  className="w-full rounded-xl border border-[#1E3D32]/18 bg-white px-4 py-3 text-[#1C2620] outline-none transition-colors focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20 dark:border-[#EDEAE0]/18 dark:bg-[#1A2420] dark:text-[#F5F3EA]"
                >
                  <option value="pequeno">Pequeno</option>
                  <option value="medio">Médio</option>
                  <option value="grande">Grande</option>
                </select>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="idade"
                  className="mb-1.5 block text-sm font-medium text-[#1C2620] dark:text-[#F5F3EA]"
                >
                  Idade
                </label>
                <input
                  id="idade"
                  type="text"
                  required
                  value={campos.idade}
                  onChange={atualizarCampo("idade")}
                  placeholder="Ex: 2 anos"
                  className="w-full rounded-xl border border-[#1E3D32]/18 bg-white px-4 py-3 text-[#1C2620] outline-none transition-colors placeholder:text-[#46564B]/60 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20 dark:border-[#EDEAE0]/18 dark:bg-[#1A2420] dark:text-[#F5F3EA] dark:placeholder:text-[#A8B0A8]/60"
                />
              </div>

              <div>
                <label
                  htmlFor="cidade"
                  className="mb-1.5 block text-sm font-medium text-[#1C2620] dark:text-[#F5F3EA]"
                >
                  Cidade
                </label>
                <input
                  id="cidade"
                  type="text"
                  required
                  value={campos.cidade}
                  onChange={atualizarCampo("cidade")}
                  placeholder="Ex: Tramandaí"
                  className="w-full rounded-xl border border-[#1E3D32]/18 bg-white px-4 py-3 text-[#1C2620] outline-none transition-colors placeholder:text-[#46564B]/60 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20 dark:border-[#EDEAE0]/18 dark:bg-[#1A2420] dark:text-[#F5F3EA] dark:placeholder:text-[#A8B0A8]/60"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="bairro"
                className="mb-1.5 block text-sm font-medium text-[#1C2620] dark:text-[#F5F3EA]"
              >
                Bairro
              </label>
              <input
                id="bairro"
                type="text"
                required
                value={campos.bairro}
                onChange={atualizarCampo("bairro")}
                placeholder="Ex: Centro"
                className="w-full rounded-xl border border-[#1E3D32]/18 bg-white px-4 py-3 text-[#1C2620] outline-none transition-colors placeholder:text-[#46564B]/60 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20 dark:border-[#EDEAE0]/18 dark:bg-[#1A2420] dark:text-[#F5F3EA] dark:placeholder:text-[#A8B0A8]/60"
              />
            </div>

            <div>
              <label
                htmlFor="foto"
                className="mb-1.5 block text-sm font-medium text-[#1C2620] dark:text-[#F5F3EA]"
              >
                Foto do pet
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
                htmlFor="historia"
                className="mb-1.5 block text-sm font-medium text-[#1C2620] dark:text-[#F5F3EA]"
              >
                História
              </label>
              <textarea
                id="historia"
                required
                rows={5}
                value={campos.historia}
                onChange={atualizarCampo("historia")}
                placeholder="Conte como esse pet foi resgatado e como ele é."
                className="w-full resize-none rounded-xl border border-[#1E3D32]/18 bg-white px-4 py-3 text-[#1C2620] outline-none transition-colors placeholder:text-[#46564B]/60 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20 dark:border-[#EDEAE0]/18 dark:bg-[#1A2420] dark:text-[#F5F3EA] dark:placeholder:text-[#A8B0A8]/60"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="numero"
                  className="mb-1.5 block text-sm font-medium text-[#1C2620] dark:text-[#F5F3EA]"
                >
                  WhatsApp/telefone
                </label>
                <input
                  id="numero"
                  type="tel"
                  value={campos.numero}
                  onChange={atualizarCampo("numero")}
                  placeholder="(51) 90000-0000"
                  className="w-full rounded-xl border border-[#1E3D32]/18 bg-white px-4 py-3 text-[#1C2620] outline-none transition-colors placeholder:text-[#46564B]/60 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20 dark:border-[#EDEAE0]/18 dark:bg-[#1A2420] dark:text-[#F5F3EA] dark:placeholder:text-[#A8B0A8]/60"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-[#1C2620] dark:text-[#F5F3EA]"
                >
                  E-mail de contato
                </label>
                <input
                  id="email"
                  type="email"
                  value={campos.email}
                  onChange={atualizarCampo("email")}
                  placeholder="contato@adoteme.com"
                  className="w-full rounded-xl border border-[#1E3D32]/18 bg-white px-4 py-3 text-[#1C2620] outline-none transition-colors placeholder:text-[#46564B]/60 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20 dark:border-[#EDEAE0]/18 dark:bg-[#1A2420] dark:text-[#F5F3EA] dark:placeholder:text-[#A8B0A8]/60"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={carregando}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-stone-800 disabled:pointer-events-none disabled:opacity-60"
            >
              {carregando
                ? modoEdicao
                  ? "Salvando..."
                  : "Cadastrando..."
                : modoEdicao
                  ? "Salvar alterações"
                  : "Cadastrar pet"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
