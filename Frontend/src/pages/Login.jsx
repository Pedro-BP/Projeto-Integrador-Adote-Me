import LoginForm from "../components/login/LoginForm";
import AuthDecorativePanel from "../components/templates/AuthDecorativePanel";

export default function Login() {
  return (
    <div className="flex min-h-screen bg-[#FAF7EF] text-[#1C2620] font-[Inter,sans-serif] antialiased">
      <LoginForm />
      <AuthDecorativePanel />
    </div>
  );
}
