
import { supabase } from "@/lib/supabaseClient";

export type Store = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  banner_url: string | null;
  logo_url: string | null;
  whatsapp: string | null;
};

export const getStoreBySlug = async (slug: string): Promise<Store | null> => {
  const { data, error } = await supabase
    .from("stores")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching store:", error);
    return null;
  }

  return data;
};
