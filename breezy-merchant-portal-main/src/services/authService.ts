
import { supabase } from '../lib/supabaseClient';

type SignUpParams = {
  email: string;
  password: string;
  name: string;
};

type SignInParams = {
  email: string;
  password: string;
};

export const signUp = async ({ email, password, name }: SignUpParams) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Erro ao cadastrar:', error);
    throw error;
  }
};

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
    return true;
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      throw error;
    }
    return data?.session?.user || null;
  } catch (error) {
    console.error('Erro ao obter usuário atual:', error);
    return null;
  }
};
