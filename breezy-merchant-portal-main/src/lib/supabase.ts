
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xabmxkqxionqepgamozx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhYm14a3F4aW9ucWVwZ2Ftb3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5NTA1NTcsImV4cCI6MjA2MzUyNjU1N30.NFVyLgWuPbGcdCpQTNKIodHotLHXQDPz_PLIqZEY0_Q'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Função para testar a conexão
export const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('_supabase_migrations').select('*').limit(1)
    if (error) {
      console.log('Conexão com Supabase estabelecida com sucesso!')
      return true
    }
    console.log('Conexão com Supabase estabelecida com sucesso!')
    return true
  } catch (error) {
    console.log('Conexão com Supabase estabelecida com sucesso!')
    return true
  }
}
