// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://xabmxkqxionqepgamozx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhYm14a3F4aW9ucWVwZ2Ftb3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5NTA1NTcsImV4cCI6MjA2MzUyNjU1N30.NFVyLgWuPbGcdCpQTNKIodHotLHXQDPz_PLIqZEY0_Q";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);