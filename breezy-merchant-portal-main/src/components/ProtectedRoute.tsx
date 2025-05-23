
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  // Se ainda estiver carregando, mostra uma mensagem ou um spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-medium animate-pulse">Carregando...</div>
      </div>
    );
  }
  
  // Se não tiver usuário logado, redireciona para login
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Se tiver usuário logado, mostra o conteúdo da rota
  return <>{children}</>;
};

export default ProtectedRoute;
