'use client';

import { useEffect, useState } from 'react';
import { getTransactions, deleteTransaction } from '@/lib/api';
import Link from 'next/link';
import { Transaction } from '@/types/transactions';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
     const fetchWithRetry = async (retries = 3, delay = 3000) => {
      try {
        const data = await getTransactions();
        setTransactions(data);
        setLoading(false);
      } catch (err) {
        if (retries > 0) {
          console.warn(`Retrying... (${3 - retries + 1})`);
          setTimeout(() => fetchWithRetry(retries - 1, delay), delay);
        } else {
          console.error('Error fetching transactions:', err);
          setError('Failed to load transactions. Please try again later.');
          setLoading(false);
        }
      }
    };

    fetchWithRetry();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteTransaction(id);
      setTransactions((prev) => prev.filter((t) => t.id != id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen p-8 bg-gray-50 flex flex-col items-center justify-center">
        <p className="text-gray-600 text-lg">Loading transactions... (Server may be waking up)</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen p-8 bg-gray-50 flex flex-col items-center justify-center">
        <p className="text-red-600 text-lg">{error}</p>
      </main>
    );
  }

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
                <p className="text-sm text-gray-500">{t.category_id}</p>
                <p className="text-sm text-gray-500">{t.date}</p>  
            </div>
            <span className="text-right text-green-600 font-semibold">${t.amount}</span>
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
