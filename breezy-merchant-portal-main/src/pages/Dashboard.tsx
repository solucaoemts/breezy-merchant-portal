
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut, Store } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <Store className="h-6 w-6 text-purple-600" />
            <span className="font-semibold text-gray-900">Minha Loja</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Olá, {user?.user_metadata?.name || 'Lojista'}
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Bem-vindo ao seu painel de controle. Gerencie sua loja com facilidade.
          </p>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border max-w-md mx-auto">
            <h3 className="font-semibold text-gray-900 mb-2">Informações da Conta</h3>
            <div className="text-left text-sm space-y-1">
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>ID:</strong> {user?.id?.substring(0, 8)}...</p>
              <p><strong>Status:</strong> <span className="text-green-600">Ativo</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
