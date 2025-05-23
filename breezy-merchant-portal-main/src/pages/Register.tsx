
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

const Register = () => {
  const navigate = useNavigate();
  const { signUp, user } = useAuth();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Se já estiver logado, redireciona para o dashboard
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      return;
    }
    
    try {
      setIsLoading(true);
      await signUp({ name, email, password });
      navigate("/login"); // Redireciona para o login após o cadastro
    } catch (error) {
      console.error("Erro ao fazer cadastro:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col">
      {/* Header com botão de voltar */}
      <div className="p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Página de Cadastro
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Crie sua conta e comece a vender online
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">Nome</label>
              <Input 
                id="name"
                type="text" 
                placeholder="Seu nome" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
              <Input 
                id="email"
                type="email" 
                placeholder="seu@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">Senha</label>
              <Input 
                id="password"
                type="password" 
                placeholder="Sua senha" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full mt-6 bg-green-600 hover:bg-green-700"
              disabled={isLoading}
            >
              {isLoading ? "Cadastrando..." : "Cadastrar"}
            </Button>
            
            <div className="text-center mt-4">
              <Button 
                variant="link" 
                onClick={() => navigate("/login")}
                className="text-green-600"
              >
                Já tem conta? Faça login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
