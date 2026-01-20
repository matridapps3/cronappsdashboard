"use client"

export default function Sidebar({ onAppClick, activeTab, apps = [] }) {
  return (
    <aside className="min-h-full w-62 bg-white dark:bg-slate-900 border-r border-slate-300 dark:border-slate-700 flex flex-col">
      <div className="p-5 border-b border-slate-300 dark:border-slate-700">
        <h2 className="text-base font-semibold text-slate-800 dark:text-slate-200">Applications</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{apps.length} apps</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3">
        {apps.length === 0 ? (
          <p className="text-center text-slate-600 dark:text-slate-400 py-10">No apps found</p>
        ) : (
          <div className="space-y-2">
            {apps.map((app) => {
              const isActive = activeTab === app.id;
              return (
                <button
                  key={app.id}
                  className={`w-full hover:scale-95 cursor-pointer flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors border ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-100 border-blue-200 dark:border-blue-900/40"
                      : "text-slate-700 dark:text-slate-300 border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  }`}
                  onClick={() => onAppClick(app)}
                >
                  <div className={`w-7 h-7 rounded-md flex items-center justify-center ${
                    isActive 
                      ? "bg-blue-600 dark:bg-blue-500 text-white" 
                      : "bg-slate-100 dark:bg-slate-800"
                  }`}>
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className={`text-base ${isActive ? "font-semibold" : ""}`}>
                    {app.name}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}