"use client"

import { useEffect, useState } from "react";

export default function DynamicAppTab({ columnName, displayName }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!columnName) return;

    setData([]);
    setError(null);

    async function fetchData() {
      try {
        const response = await fetch(`/api/data/apptable?app=${encodeURIComponent(columnName)}`);
        const result = await response.json();
        
        if (!response.ok) {
          setError(result.error || result.message || "Failed to load data");
          setData([]);
          return;
        }
        
        setData(result.data || []);
        setError(null);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load data");
        setData([]);
      }
    }

    fetchData();
  }, [columnName]);

  const headers = data.length > 0 
    ? [...new Set(data.flatMap(row => Object.keys(row)))].filter((k) => k !== "id")
    : [];

  return (
    <div className="w-full overflow-hidden max-h-[calc(100vh-70px)] min-h-0 p-6 lg:p-8 lg:pb-8 flex flex-col">
      <div className="flex items-center justify-between mb-4 shrink-0">
        <h1 className="text-2xl text-blue-600 font-semibold dark:text-slate-100">
          {displayName || columnName}
        </h1>
      </div>

      {error && (
        <div className="mb-4 rounded border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 px-4 py-3 text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      {!error && data.length === 0 && (
        <div className="text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-8">
          No data found.
        </div>
      )}

      {!error && data.length > 0 && (
        <div className="custom-scrollbar flex-1 pb-6 overflow-x-auto overflow-y-auto bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg">
          <table className="min-w-full text-base border-separate border-spacing-0">
            <thead>
              <tr>
                {headers.map((h) => (
                  <th key={h} className="px-5 py-4 text-left font-semibold text-slate-800 dark:text-slate-300 whitespace-nowrap bg-slate-50 dark:bg-slate-800/50 sticky top-0 z-20">
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
                    i%2 === 0 ? 
                    <td key={h} className="px-5 text-sm py-4 bg-gray-200 text-slate-700 dark:text-slate-300 whitespace-nowrap">
                      {row[h] ?? "-"}
                    </td>
                    :
                    <td key={h} className="px-5 text-sm py-4 text-slate-700 dark:text-slate-300 whitespace-nowrap">
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
