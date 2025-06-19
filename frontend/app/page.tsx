'use client';

import Link from 'next/link';

export default function Home() {
  return (
     <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <h1 className="text-4xl font-bold mb-8">Welcome to Mint 2.0 :)</h1>
      
      <div className="flex gap-6">
        <Link href="/transactions">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            View Transactions
          </button>
        </Link>

        <Link href="/categories">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Manage Categories
          </button>
        </Link>

        <Link href="/analytics">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            View Spending Summary
          </button>
        </Link>
      </div>
    </div>
  );
}
