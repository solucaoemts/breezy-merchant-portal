
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
        Bem-vindo ao Portal do Lojista
      </h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-md mb-8">
        A plataforma completa para gerenciar sua loja online.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        {user ? (
          <Button
            onClick={() => navigate("/dashboard")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg"
          >
            Ir para o Dashboard
          </Button>
        ) : (
          <>
            <Button
              onClick={() => navigate("/login")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
            >
              Entrar
            </Button>
            <Button
              onClick={() => navigate("/register")}
              variant="outline"
              className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg"
            >
              Criar Conta
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
