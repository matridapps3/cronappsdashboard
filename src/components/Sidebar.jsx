"use client"

export default function Sidebar({ onAppClick, activeTab, apps }) {
  const list = apps || [];

  return (
    <aside className="h-full min-h-0 w-62 overflow-hidden bg-white dark:bg-slate-900 border-r border-slate-300 dark:border-slate-700 flex flex-col animate-fadeIn">
      <div className="w-full  p-5 border-b border-slate-300 dark:border-slate-700">
        <h2 className="text-base font-semibold text-slate-800 dark:text-slate-200">Applications</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{list.length} apps</p>
      </div>
      
      <div className="w-full flex-1 min-h-0 overflow-y-auto p-3 pr-4">
        {list.length === 0 ? (
          <p className="text-center text-slate-600 dark:text-slate-400 py-10">No apps found</p>
        ) : (
          <div className="space-y-4">
            {list.map((app, i) => {
              const isActive = activeTab === app.id;
              const isAlt = i % 2 === 1;
              return (
                <button
                  key={app.id}
                  className={`w-full relative hover:scale-95 cursor-pointer flex items-center rounded-lg text-left transition-colors border ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-100 border-blue-200 dark:border-blue-900/40"
                      : `text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600/70 hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                        isAlt ? "bg-slate-100/80 dark:bg-slate-800/40" : "bg-white dark:bg-slate-900"
                        }`
                  }`}
                  onClick={() => onAppClick(app)}
                  title={app.name}
                >
                  <span
                    className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-lg ${
                      isActive ? "bg-blue-600 dark:bg-blue-500" : "bg-blue-200 dark:bg-blue-950/50"
                    }`}
                  />
                  <span className={`flex-1 min-w-0 truncate px-3 py-2.5 text-base ${isActive ? "font-semibold" : ""}`}>
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