export default function Header() {
    return (<div>
<nav className="bg-blue-500">
            <ul className="flex justify-center list-none m-0 p-0 text-center font-semibold">
                <li>
                <img src="" alt="" /></li>
                <li className="px-4 py-6 cursor-pointer text-white hover:text-cyan-200">Adoção</li>
                <li className="px-4 py-6 cursor-pointer text-white hover:text-cyan-200">Contato</li>
                <li className="px-4 py-6 cursor-pointer text-white hover:text-cyan-200">Localização</li>
            </ul>
        </nav>

        <div className="max-w-2xl my-2 py-2 px-10 font-semibold text-stone-700">
            <h3 className="text-3xl text-left my-10 font-semibold">
            Sobre o Projeto
            </h3>
            <p className="text-xl flex justify-center">
                No 'Adote-Me', acreditamos que todo animal merece uma segunda chance. Nossa missão é conectar cães e gatos que aguardam por um lar a pessoas dispostas a oferecer amor, cuidado e responsabilidade. Por meio da nossa plataforma, facilitamos o processo de adoção responsável, aproximando protetores, ONGs e futuros tutores de forma simples, segura e organizada.
            </p>
            <p className="text-xl flex justify-center">
                Mais do que um site de adoção, queremos incentivar a conscientização sobre a importância de combater o abandono e promover a guarda responsável. Cada adoção representa uma nova história, um recomeço e a oportunidade de transformar a vida de um animal e de uma família. Junte-se ao **Adote-Me**, encontre seu novo melhor amigo e faça parte dessa corrente de solidariedade e amor pelos animais.
            </p>
        </div>
        </div>)
}