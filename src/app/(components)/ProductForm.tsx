// src/app/(components)/ProductForm.tsx
// Cap. 08 - 6.3.1 Componente de Formulário de Produto
// Client Component porque usa useState e useEffect para controlar o formulário.
'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/lib/data';

interface ProductFormProps {
  product?: Product | null; // Se vier um produto -> modo edição; se não -> modo criação
  onSave: (product: Omit<Product, 'id'> | Product) => void;
  onCancel: () => void;
}

export default function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  // Sempre que o produto mudar, preenche (ou limpa) os campos
  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setPrice(String(product.price));
    } else {
      setTitle('');
      setPrice('');
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      title,
      price: parseFloat(price),
    };
    if (product && product.id) {
      onSave({ id: product.id, ...productData }); // Edição (PUT)
    } else {
      onSave(productData); // Criação (POST)
    }
  };

  return (
    // Obs.: no Tailwind v4 a classe "bg-opacity-50" do material não existe mais;
    // o equivalente é "bg-black/50" (preto com 50% de opacidade).
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      {/* text-black garante texto legível no modal branco mesmo com o tema escuro */}
      <div className="bg-white text-black p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{product ? 'Editar Produto' : 'Novo Produto'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Título</label>
            <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded" required />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">Preço</label>
            <input type="number" id="price" value={price} onChange={e => setPrice(e.target.value)} className="w-full p-2 border rounded" required step="0.01" />
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onCancel} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors">
              Cancelar
            </button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
