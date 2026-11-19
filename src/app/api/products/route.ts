// src/app/api/products/route.ts
// Cap. 08 - 4.1 Criando a API de Produtos (GET)
// Cap. 08 - 6.2.1 Criando Produtos (POST)
import { NextResponse } from 'next/server';
import { products } from '@/lib/data'; // Dados agora vêm do arquivo separado

// GET /api/products -> lista todos os produtos (Read)
/* eslint-disable @typescript-eslint/no-unused-vars */
export async function GET(request: Request) {
  return NextResponse.json(products);
}

// POST /api/products -> cria um novo produto (Create)
export async function POST(request: Request) {
  const newProductData = await request.json();

  // Validação simples
  if (!newProductData.title || !newProductData.price) {
    return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
  }

  // Gera o próximo id (maior id existente + 1)
  const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

  const newProduct = {
    id: newId,
    ...newProductData,
  };

  products.push(newProduct);

  return NextResponse.json(newProduct, { status: 201 }); // 201 Created
}
