
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xabmxkqxionqepgamozx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhYm14a3F4aW9ucWVwZ2Ftb3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5NTA1NTcsImV4cCI6MjA2MzUyNjU1N30.NFVyLgWuPbGcdCpQTNKIodHotLHXQDPz_PLIqZEY0_Q'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
})
