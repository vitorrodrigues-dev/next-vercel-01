// src/app/(components)/ProductCard.tsx
// Cap. 08 - 2.2 Detalhando o Tailwind CSS (classes do card)
// Cap. 08 - 6.3.2 ProductCard atualizado com ações de Editar e Excluir
import { Product } from '@/lib/data';
import { FaEdit, FaTrash } from 'react-icons/fa';

export interface ProductCardProps {
  product: Product;
  // Opcionais (como no repositório do curso) para o ProductList,
  // que só passa "product", continuar compilando.
  onEdit?: () => void;
  onDelete?: () => void;
}

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    // border: borda | p-4: padding 1rem | rounded-lg: cantos arredondados | shadow: sombra
    <div className="border p-4 rounded-lg shadow">
      {/* text-xl: texto extragrande | font-bold: negrito */}
      <h3 className="text-xl font-bold">{product.title}</h3>
      {/* text-lg: texto grande | mt-2: margem superior 0.5rem */}
      <p className="text-lg mt-2">R$ {product.price.toFixed(2)}</p>
      <div className="mt-4 flex gap-2 align-center justify-between">
        <button onClick={onEdit} className="text-blue-500 hover:text-blue-700 flex items-center gap-1">
          <FaEdit /> Editar
        </button>
        <button onClick={onDelete} className="text-red-500 hover:text-red-700 flex items-center gap-1">
          <FaTrash /> Excluir
        </button>
      </div>
    </div>
  );
}
