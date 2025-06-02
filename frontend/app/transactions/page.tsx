'use client';

import { useEffect, useState } from 'react';
import { getTransactions } from '@/lib/api';
import Link from 'next/link';

interface Transaction {
  id: number;
  description: string;
  category: string;
  amount: number;
  date: string;
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTransactions()
      .then(setTransactions)
      .catch(err => console.error('Error fetching transactions:', err));
  }, []);

  const handleDelete = async (id: number) => {
    const res = await fetch(`http://localhost:5000/api/transactions/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } else {
      console.error('Failed to delete transaction');
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Transactions</h1>
      <Link
        href="/transactions/new"
        className="mb-6 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        + Add New Transaction
      </Link>

      <Link
        href="/"
        className="mb-6 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Return to Home
      </Link>

      <ul className="w-full max-w-2xl space-y-3">
        {transactions.map((t) => (
          <li key={t.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border">
            <div>
                <p className="font-semibold text-sm text-gray-500">{t.description}</p>  
                <p className="text-sm text-gray-500">{t.category}</p>
                <p className="text-sm text-gray-500">{t.date}</p>  
            </div>
            <span className="text-right text-green-600 font-semibold">${t.amount.toFixed(2)}</span>
            <button
              onClick={() => handleDelete(t.id)}
              className="text-red-600 hover:text-red-800 font-semibold"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
