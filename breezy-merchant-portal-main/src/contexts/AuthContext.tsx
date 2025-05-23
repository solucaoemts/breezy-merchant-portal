
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import { signIn as authSignIn, signUp as authSignUp, signOut as authSignOut } from '../services/authService';
import { toast } from '@/components/ui/sonner';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (params: { email: string; password: string }) => Promise<void>;
  signUp: (params: { email: string; password: string; name: string }) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Primeiro configurar o listener para mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth event:', event);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Depois verificar se já existe uma sessão
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (params: { email: string; password: string }) => {
    try {
      setLoading(true);
      const { session } = await authSignIn(params);
      setSession(session);
      setUser(session?.user ?? null);
      toast.success('Login realizado com sucesso!');
    } catch (error: any) {
      toast.error(`Erro ao fazer login: ${error.message || 'Tente novamente'}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (params: { email: string; password: string; name: string }) => {
    try {
      setLoading(true);
      await authSignUp(params);
      toast.success('Cadastro realizado com sucesso! Faça login para continuar.');
    } catch (error: any) {
      toast.error(`Erro ao cadastrar: ${error.message || 'Tente novamente'}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOutUser = async () => {
    try {
      setLoading(true);
      await authSignOut();
      setSession(null);
      setUser(null);
      toast.success('Logout realizado com sucesso!');
    } catch (error: any) {
      toast.error(`Erro ao fazer logout: ${error.message || 'Tente novamente'}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut: signOutUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
