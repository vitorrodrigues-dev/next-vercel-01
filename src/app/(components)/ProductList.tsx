// src/app/(components)/ProductList.tsx
// Cap. 08 - 4.2 Consumindo a Própria API
// Cap. 08 - 5.2 Acessando as Variáveis de Ambiente
import { ProductCard } from "./ProductCard";

export interface Product {
  id: number;
  title: string;
  price: number;
}

async function getProducts(): Promise<{ products: Product[] }> {
  // A chamada fetch é feita no servidor.
  // Em vez de deixar 'http://localhost:3000' fixo no código,
  // lemos a URL base da variável de ambiente definida no .env.local
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${baseUrl}/api/products`, {
    // cache: 'no-store' // Use para garantir dados sempre frescos (SSR)
    next: { revalidate: 60 } // Use para revalidar a cada 60s (ISR)
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return {
    products: await res.json(),
  };
}

export const ProductsList = async () => {
  const { products } = await getProducts();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
