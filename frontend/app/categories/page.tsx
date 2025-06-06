'use client';

import { useEffect, useState } from 'react';
import { getCategories, postCategory, deleteCategory } from '@/lib/api';
import { Category } from '@/types/categories';
import { useRouter } from 'next/navigation';

export default function ManageCategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<Omit<Category, 'id'>>({
  name: '',
  type: 'expense',
});

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postCategory(form);
      setForm({ name: '', type: 'expense' });
      fetchCategories();
    } catch (err) {
      console.error('Failed to add category:', err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCategory(id);
      fetchCategories();
    } catch (err) {
      console.error('Failed to delete category:', err);
    }
  };

  return (
    <div className="bg-white text-black min-h-screen p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Categories</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          name="name"
          placeholder="Category name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="w-full border border-gray-300 rounded-lg p-3"
        />
        <select
          name="type"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value as 'income' | 'expense' | 'none' })}
          className="w-full border border-gray-300 rounded-lg p-3 bg-white"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
          <option value="none">None</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Category
        </button>
         <button
            type="button"
            onClick={() => router.push('/')}
            className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
      </form>

      <ul className="space-y-3">
        {categories.map((cat) => (
          <li key={cat.id} className="flex justify-between items-center border-b pb-2">
            <div>
              <span className="font-medium">{cat.name}</span>
              <span className="ml-2 text-sm text-gray-600">({cat.type})</span>
            </div>
            <button
              onClick={() => handleDelete(cat.id)}
              className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
