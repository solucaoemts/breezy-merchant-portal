
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStoreBySlug, type Store } from "@/services/storeService";
import { getProductsByStoreId, type Product } from "@/services/productService";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils";

const StorePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [store, setStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchStoreData = async () => {
      if (!slug) {
        setError(true);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(false);
      
      try {
        const storeData = await getStoreBySlug(slug);
        
        if (!storeData) {
          setError(true);
          setLoading(false);
          return;
        }

        setStore(storeData);
        
        // Fetch products after getting store
        const productsData = await getProductsByStoreId(storeData.id);
        setProducts(productsData);
      } catch (err) {
        console.error("Error fetching store data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStoreData();
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-4">
          <Skeleton className="h-40 w-full rounded-lg" />
          <Skeleton className="h-20 w-20 rounded-full" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-16 w-full" />
          <div className="grid grid-cols-2 gap-4 w-full">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !store) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Loja não encontrada
          </h1>
          <p className="text-gray-600 text-center">
            A loja que você procura não existe ou está temporariamente indisponível.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      {store.banner_url && (
        <div className="w-full h-40 sm:h-56 relative">
          <img
            src={store.banner_url}
            alt={`${store.name} banner`}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center mb-6">
          {/* Logo */}
          {store.logo_url && (
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md -mt-12 bg-white z-10">
              <img
                src={store.logo_url}
                alt={`${store.name} logo`}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Store Name */}
          <h1 className="text-2xl sm:text-3xl font-bold text-center mt-4">
            {store.name}
          </h1>

          {/* Store Description */}
          {store.description && (
            <p className="text-gray-600 text-center mt-2 max-w-lg">
              {store.description}
            </p>
          )}
        </div>

        {/* Products Grid */}
        <h2 className="text-xl font-semibold mb-4">Produtos</h2>
        
        {products.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhum produto disponível no momento</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden h-full flex flex-col">
                <div className="relative pt-[100%]">
                  {product.image_urls && product.image_urls.length > 0 ? (
                    <img
                      src={product.image_urls[0]}
                      alt={product.name}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute top-0 left-0 w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Sem imagem</span>
                    </div>
                  )}
                </div>
                <CardContent className="p-3 flex flex-col flex-grow">
                  <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
                  {product.description && (
                    <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                  <div className="mt-auto pt-2">
                    <p className="font-bold text-sm">
                      {product.price ? formatCurrency(product.price) : "Sob consulta"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StorePage;
