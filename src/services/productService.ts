
import { supabase } from "@/lib/supabaseClient";

export type Product = {
  id: string;
  store_id: string;
  name: string;
  description: string | null;
  price: number | null;
  image_urls: string[];
  active: boolean;
};

export const getProductsByStoreId = async (storeId: string): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("store_id", storeId)
    .eq("active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return data || [];
};
