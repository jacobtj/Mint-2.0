import { Transaction } from '@/types/transactions';
import { Category } from '@/types/categories';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'; // Your Express backend

export async function getTransactions(): Promise<Transaction[]> {
  const res = await fetch(`${BASE_URL}/transactions`);
  if (!res.ok) throw new Error('Failed to fetch transactions');
  return res.json();
}

export async function postTransaction(data: Omit<Transaction, 'id'>): Promise<Transaction> {
  const res = await fetch(`${BASE_URL}/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Failed to create transaction');
  return res.json();
}

export async function deleteTransaction(id: number) {
  const res = await fetch(`${BASE_URL}/transactions/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) throw new Error('Failed to delete transaction');
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function postCategory(data: Omit<Category, 'id'>): Promise<Category> {
  const res = await fetch(`${BASE_URL}/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create category');
  return res.json();
}

export async function deleteCategory(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/categories/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete category');
}

export async function getSummary(month: string) {
  const res = await fetch(`${BASE_URL}/analytics/summary?month=${month}`);
  if (!res.ok) throw new Error('Failed to fetch summary');
  return res.json();
}

export async function getCategorySpending(month: string) {
  const res = await fetch(`${BASE_URL}/analytics/category-spending?month=${month}`);
  if (!res.ok) throw new Error('Failed to fetch category spending');
  return res.json();
}
