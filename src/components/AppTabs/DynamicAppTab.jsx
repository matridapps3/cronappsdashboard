"use client"

import { useEffect, useState } from "react";

export default function DynamicAppTab({ columnName, displayName }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!columnName) return;

    async function fetchData() {
      try {
        const response = await fetch(`/api/data?column=${encodeURIComponent(columnName)}`);
        const result = await response.json();
        setData(result.data || []);
        setError(null);
      } catch (err) {
        setError("Failed to load data");
      }
    }

    fetchData();
  }, [columnName]);

  const headers = data.length > 0 
    ? [...new Set(data.flatMap(row => Object.keys(row)))].filter((k) => k !== "id")
    : [];

  return (
    <div className="w-full p-6 lg:p-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          {displayName || columnName}
        </h1>
      </div>

      {error && (
        <div className="mb-4 rounded border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 px-4 py-3 text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      {!error && data.length === 0 && (
        <div className="text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-8">
          No data found.
        </div>
      )}

      {!error && data.length > 0 && (
        <div className="overflow-x-auto bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg">
          <table className="w-full text-base">
            <thead className="bg-slate-50 dark:bg-slate-800/50 sticky top-0">
              <tr>
                {headers.map((h) => (
                  <th key={h} className="px-5 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">
                    {h.replace(/_/g, " ")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr
                  key={row.id || i}
                  className={`border-t border-slate-300 dark:border-slate-700 ${
                    i % 2 === 0 ? "bg-white dark:bg-slate-900" : "bg-slate-50/50 dark:bg-slate-800/20"
                  } hover:bg-blue-50/60 dark:hover:bg-blue-950/20`}
                >
                  {headers.map((h) => (
                    <td key={h} className="px-5 py-4 text-slate-700 dark:text-slate-300">
                      {row[h] ?? "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
