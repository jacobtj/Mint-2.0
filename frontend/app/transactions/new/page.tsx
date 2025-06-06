'use client';

import { useState, useEffect } from 'react';
import { getCategories, postTransaction } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { Category } from '@/types/categories';

export default function NewTransactionPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    description: '',
    amount: '',
    date: '',
    category_id: '',
  });

  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch categories on mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    }

    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postTransaction({
        ...form,
        amount: parseFloat(form.amount),
        category_id: parseInt(form.category_id)
      });
      router.push('/transactions');
    } catch (err) {
      console.error('Error posting transaction:', err);
    }
  };

  return (
    <div className="bg-white text-black min-h-screen p-6 max-w-xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">New Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg p-3"
        />
        <select
          name="category_id"
          value={form.category_id}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg p-3 bg-white"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name} ({cat.type})
            </option>
          ))}
        </select>
        <input
          name="amount"
          placeholder="Amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg p-3"
        />
        <input
          name="date"
          placeholder="Date (YYYY-MM-DD)"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg p-3"
        />

        <div className="flex justify-between items-center mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Transaction
          </button>
          <button
            type="button"
            onClick={() => router.push('/transactions')}
            className="text-blue-600 hover:underline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
