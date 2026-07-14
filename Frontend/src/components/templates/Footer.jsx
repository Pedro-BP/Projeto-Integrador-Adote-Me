export default function Footer() {
  return (
    <footer
      id="contato"
      className="border-t border-[#1E3D32]/[0.14] px-6 pb-8 pt-12"
    >
      <div className="mx-auto grid max-w-280 gap-8 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="mb-2.5 flex items-center gap-2.5 font-[Fraunces,serif] font-bold text-[#1E3D32]">
            Adote-Me
          </div>
          <p className="max-w-[34ch] text-sm text-[#46564B]">
            Acolhimento e adoção responsável de animais em busca de um novo lar.
          </p>
        </div>

        <div>
          <h4 className="mb-3.5 font-[IBM_Plex_Mono,monospace] text-xs uppercase tracking-[0.06em] text-[#1C2620]">
            ONG
          </h4>
          <ul className="grid gap-2.5">
            <li>
              <a
                href="/#sobre"
                className="text-sm text-[#46564B] hover:text-[#1E3D32]"
              >
                Sobre
              </a>
            </li>
            <li>
              <a
                href="/#resgates"
                className="text-sm text-[#46564B] hover:text-[#1E3D32]"
              >
                Recém-acolhidos
              </a>
            </li>
            <li>
              <a
                href="/#ajudar"
                className="text-sm text-[#46564B] hover:text-[#1E3D32]"
              >
                Como ajudar
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3.5 font-[IBM_Plex_Mono,monospace] text-xs uppercase tracking-[0.06em] text-[#1C2620]">
            Contato
          </h4>
          <ul className="grid gap-2.5">
            <li>
              <a
                href="mailto:adotemetramandai@gmail.com"
                className="text-sm text-[#46564B] hover:text-[#1E3D32]"
              >
                adotemetramandai@gmail.com
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/adotemetramandai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#46564B] hover:text-[#1E3D32]"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-280 border-t border-[#1E3D32]/[0.14] pt-5 text-sm text-[#46564B]">
        © {new Date().getFullYear()} Adote-Me. Todos os direitos reservados.
      </div>
    </footer>
  );
}
