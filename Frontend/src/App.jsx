import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Animais from "./pages/Animais";
import Animal from "./pages/Animal";
import Feed from "./pages/Feed";
import Admin from "./pages/Admin";
import CadastrarPet from "./pages/CadastrarPet";
import NaoEncontrada from "./pages/NaoEncontrada";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/animais" element={<Animais />} />
      <Route path="/animais/:id" element={<Animal />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/cadastrar-pet" element={<CadastrarPet />} />
      <Route path="/admin/pets/:id/editar" element={<CadastrarPet />} />
      <Route path="*" element={<NaoEncontrada />} />
    </Routes>
  );
}
