import { Transaction } from '@/types/transactions';

const BASE_URL = 'https://mint-2-0.onrender.com/api'; // Your Express backend

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
