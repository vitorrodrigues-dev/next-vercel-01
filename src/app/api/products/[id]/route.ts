// src/app/api/products/[id]/route.ts
// Cap. 08 - 6.2.2 Lendo, Atualizando e Deletando um Produto Específico (Roteamento Dinâmico)
// O [id] no nome da pasta indica que "id" é um parâmetro dinâmico: /api/products/1, /api/products/2...
import { NextResponse } from 'next/server';
import { products } from '@/lib/data';

interface Params {
  id: string;
}

// GET /api/products/:id -> busca um produto específico (Read)
export async function GET(request: Request, context: { params: Promise<Params> }) {
  const params = await context.params; // No Next 15, params é uma Promise
  const id = parseInt(params.id, 10);
  const product = products.find(p => p.id === id);

  if (product) {
    return NextResponse.json(product);
  } else {
    return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });
  }
}

// PUT /api/products/:id -> atualiza um produto (Update)
export async function PUT(request: Request, context: { params: Promise<Params> }) {
  const params = await context.params;
  const id = parseInt(params.id, 10);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });
  }

  const updatedData = await request.json();
  products[index] = { ...products[index], ...updatedData };

  return NextResponse.json(products[index]);
}

// DELETE /api/products/:id -> remove um produto (Delete)
export async function DELETE(request: Request, context: { params: Promise<Params> }) {
  const params = await context.params;
  const id = parseInt(params.id, 10);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });
  }

  const [deletedProduct] = products.splice(index, 1);

  return NextResponse.json(deletedProduct);
}
