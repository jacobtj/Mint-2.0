'use client';

import { useState } from 'react';
import { postTransaction } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function NewTransactionPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    description: '',
    category: '',
    amount: '',
    date: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postTransaction({
        ...form,
        amount: parseFloat(form.amount),
      });
      router.push('/transactions');
    } catch (err) {
      console.error('Error posting transaction:', err);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">New Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        <input
          name="amount"
          placeholder="Amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        <input
          name="date"
          placeholder="Date (YYYY-MM-DD)"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg p-2"
        />

        <div className="flex justify-between items-center mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Transaction
          </button>
          <button
            type="button"
            onClick={() => router.push('/transactions')}
            className="text-gray-500 hover:underline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
