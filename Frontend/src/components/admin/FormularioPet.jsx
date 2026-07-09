import { useState } from "react";
import { Link } from "react-router-dom";

const CAMPOS_INICIAIS = {
  nome: "",
  tipo: "cachorro",
  porte: "pequeno",
  idade: "",
  cidade: "",
  bairro: "",
  fotoUrl: "",
  historia: "",
  numero: "",
  email: "",
};

export default function FormularioPet({ petInicial }) {
  const modoEdicao = Boolean(petInicial);
  const [campos, setCampos] = useState({
    ...CAMPOS_INICIAIS,
    ...petInicial,
  });
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  function atualizarCampo(campo) {
    return (e) => setCampos((atual) => ({ ...atual, [campo]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    const obrigatorios = ["nome", "idade", "cidade", "bairro", "historia"];
    const faltando = obrigatorios.some((campo) => !campos[campo].trim());
    if (faltando) {
      setErro("Preencha todos os campos obrigatórios para continuar.");
      return;
    }

    setCarregando(true);
    setTimeout(() => setCarregando(false), 900);
  }

  return (
    <section className="px-6 pb-20 pt-12 md:pt-16">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/admin"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-[#46564B] hover:text-[#1E3D32]"
        >
          ← Voltar para o painel
        </Link>

        <div className="rounded-[20px] border border-[#1E3D32]/[0.14] bg-white p-8 sm:p-10">
          <span className="font-[IBM_Plex_Mono,monospace] text-xs uppercase tracking-[0.12em] text-cyan-600">
            Área administrativa
          </span>

          <h1 className="mb-6 mt-3 font-[Fraunces,serif] text-3xl font-bold text-[#1E3D32] sm:text-4xl">
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
                className="mb-1.5 block text-sm font-medium text-[#1C2620]"
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
                className="w-full rounded-xl border border-[#1E3D32]/18 bg-white px-4 py-3 text-[#1C2620] outline-none transition-colors placeholder:text-[#46564B]/60 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="tipo"
                  className="mb-1.5 block text-sm font-medium text-[#1C2620]"
                >
                  Espécie
                </label>
                <select
                  id="tipo"
                  value={campos.tipo}
                  onChange={atualizarCampo("tipo")}
                  className="w-full rounded-xl border border-[#1E3D32]/18 bg-white px-4 py-3 text-[#1C2620] outline-none transition-colors focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20"
                >
                  <option value="cachorro">Cachorro</option>
                  <option value="gato">Gato</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="porte"
                  className="mb-1.5 block text-sm font-medium text-[#1C2620]"
                >
                  Porte
                </label>
                <select
                  id="porte"
                  value={campos.porte}
                  onChange={atualizarCampo("porte")}
                  className="w-full rounded-xl border border-[#1E3D32]/18 bg-white px-4 py-3 text-[#1C2620] outline-none transition-colors focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20"
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
                  className="mb-1.5 block text-sm font-medium text-[#1C2620]"
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
                  className="w-full rounded-xl border border-[#1E3D32]/18 bg-white px-4 py-3 text-[#1C2620] outline-none transition-colors placeholder:text-[#46564B]/60 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20"
                />
              </div>

              <div>
                <label
                  htmlFor="cidade"
                  className="mb-1.5 block text-sm font-medium text-[#1C2620]"
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
                  className="w-full rounded-xl border border-[#1E3D32]/18 bg-white px-4 py-3 text-[#1C2620] outline-none transition-colors placeholder:text-[#46564B]/60 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="bairro"
                className="mb-1.5 block text-sm font-medium text-[#1C2620]"
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
                className="w-full rounded-xl border border-[#1E3D32]/18 bg-white px-4 py-3 text-[#1C2620] outline-none transition-colors placeholder:text-[#46564B]/60 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20"
              />
            </div>

            <div>
              <label
                htmlFor="fotoUrl"
                className="mb-1.5 block text-sm font-medium text-[#1C2620]"
              >
                URL da foto
              </label>
              <input
                id="fotoUrl"
                type="url"
                value={campos.fotoUrl}
                onChange={atualizarCampo("fotoUrl")}
                placeholder="https://..."
                className="w-full rounded-xl border border-[#1E3D32]/18 bg-white px-4 py-3 text-[#1C2620] outline-none transition-colors placeholder:text-[#46564B]/60 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20"
              />
            </div>

            <div>
              <label
                htmlFor="historia"
                className="mb-1.5 block text-sm font-medium text-[#1C2620]"
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
                className="w-full resize-none rounded-xl border border-[#1E3D32]/18 bg-white px-4 py-3 text-[#1C2620] outline-none transition-colors placeholder:text-[#46564B]/60 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="numero"
                  className="mb-1.5 block text-sm font-medium text-[#1C2620]"
                >
                  WhatsApp/telefone
                </label>
                <input
                  id="numero"
                  type="tel"
                  value={campos.numero}
                  onChange={atualizarCampo("numero")}
                  placeholder="(51) 90000-0000"
                  className="w-full rounded-xl border border-[#1E3D32]/18 bg-white px-4 py-3 text-[#1C2620] outline-none transition-colors placeholder:text-[#46564B]/60 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-[#1C2620]"
                >
                  E-mail de contato
                </label>
                <input
                  id="email"
                  type="email"
                  value={campos.email}
                  onChange={atualizarCampo("email")}
                  placeholder="contato@adoteme.com"
                  className="w-full rounded-xl border border-[#1E3D32]/18 bg-white px-4 py-3 text-[#1C2620] outline-none transition-colors placeholder:text-[#46564B]/60 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20"
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
