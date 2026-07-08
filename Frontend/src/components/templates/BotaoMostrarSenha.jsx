export default function BotaoMostrarSenha({ visible, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
      className="absolute inset-y-0 right-0 flex items-center px-3.5 text-[#46564B] hover:text-[#1E3D32]"
    >
      {visible ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path
            d="M3 3l18 18M10.58 10.58a2 2 0 002.83 2.83M9.88 5.09A9.77 9.77 0 0112 5c5 0 9 4.5 10 7-.42.96-1.14 2.07-2.13 3.09M6.1 6.1C3.9 7.44 2.42 9.4 2 12c1 2.5 5 7 10 7 1.06 0 2.06-.18 3-.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path
            d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )}
    </button>
  );
}
