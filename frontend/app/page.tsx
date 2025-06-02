'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Mint 2.0</h1>
      <p className="text-lg text-gray-600 mb-6">
        :)
      </p>
      <Link
        href="/transactions"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        View Transactions
      </Link>
    </main>
  );
}
