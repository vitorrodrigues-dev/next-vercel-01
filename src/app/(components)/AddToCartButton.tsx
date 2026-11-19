// src/app/(components)/AddToCartButton.tsx (versão atualizada)
// Cap. 08 - 3.2 Utilizando Ícones no Projeto (react-icons)
"use client"; // Marca este como um Client Component

import { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa'; // Ícone do pacote Font Awesome

export default function AddToCartButton({ productId }: { productId: number }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    alert(`Produto ${productId} adicionado ao carrinho!`);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000); // Reseta o estado após 2 segundos
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdded}
      // flex items-center justify-center gap-2 -> alinha ícone e texto lado a lado
      className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
    >
      <FaShoppingCart />{isAdded ? 'Adicionado!' : 'Adicionar ao Carrinho'}
    </button>
  );
}
