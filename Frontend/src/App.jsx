import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Animais from "./pages/Animais";
import Animal from "./pages/Animal";
import Feed from "./pages/Feed";
import CriarPostagem from "./pages/CriarPostagem";
import Admin from "./pages/Admin";
import CadastrarPet from "./pages/CadastrarPet";
import NaoEncontrada from "./pages/NaoEncontrada";
import { obterSessao } from "./services/sessao";

function RotaAdmin({ children }) {
  const sessao = obterSessao();
  if (sessao?.usuario.perfil !== "admin") {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function RotaLogada({ children }) {
  const sessao = obterSessao();
  if (!sessao) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/animais" element={<Animais />} />
      <Route path="/animais/:id" element={<Animal />} />
      <Route path="/feed" element={<Feed />} />
      <Route
        path="/feed/nova-postagem"
        element={
          <RotaLogada>
            <CriarPostagem />
          </RotaLogada>
        }
      />
      <Route
        path="/admin"
        element={
          <RotaAdmin>
            <Admin />
          </RotaAdmin>
        }
      />
      <Route
        path="/admin/cadastrar-pet"
        element={
          <RotaAdmin>
            <CadastrarPet />
          </RotaAdmin>
        }
      />
      <Route
        path="/admin/pets/:id/editar"
        element={
          <RotaAdmin>
            <CadastrarPet />
          </RotaAdmin>
        }
      />
      <Route path="*" element={<NaoEncontrada />} />
    </Routes>
  );
}
