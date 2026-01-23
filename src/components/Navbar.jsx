"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-300 dark:border-slate-700">
      <div className="flex justify-between items-center h-full px-6">
        <div className="flex items-center gap-2">
          <div className="w-13 h-9 rounded bg-blue-600 dark:bg-blue-500 flex items-center justify-center">
            <span className="text-white text-sm font-semibold">CRON</span>
          </div>
          <h1 className="font-semibold text-xl text-slate-900 dark:text-slate-100">
            CronApps Manager
          </h1>
        </div>

        {pathname !== "/login" && (
          <Link href="/login">
            <button className="px-5 py-2.5 text-base rounded bg-blue-600 dark:bg-blue-500 text-white hover:scale-95 hover:bg-blue-700 dark:hover:bg-blue-600 cursor-pointer">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}