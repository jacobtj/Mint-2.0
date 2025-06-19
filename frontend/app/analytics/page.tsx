'use client';

import { useEffect, useState } from 'react';
import { getSummary } from '@/lib/api';
import { SummaryData } from '@/types/summaries';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function getCurrentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<SummaryData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const currentMonth = getCurrentMonth();

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const result = await getSummary(currentMonth);
        setData(result);
      } catch (err) {
        console.error('Error fetching summary:', err);
        setError('Failed to load summary');
      }
    };

    fetchSummary();
  }, [currentMonth]);

  return (
    <div className="p-6 bg-white min-h-screen text-black">
      <h1 className="text-2xl font-bold mb-4">Summary for {currentMonth}</h1>
      {error && <p className="text-red-500">{error}</p>}
      {data ? (
        <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
      {data && (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-black mb-4">Income / Expenses</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[data]}>
              <XAxis dataKey={() => 'Totals'} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total_income" fill="#4ade80" name="Income" />
              <Bar dataKey="total_expenses" fill="#f87171" name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
