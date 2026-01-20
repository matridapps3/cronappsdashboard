"use client"

import DynamicAppTab from "@/components/AppTabs/DynamicAppTab";

export default function TabContainer({ activeApp }) {
  if (!activeApp) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <p className="text-slate-600 dark:text-slate-400">Select an app from sidebar</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-950">
      <DynamicAppTab 
        columnName={activeApp.columnName} 
        displayName={activeApp.name}
      />
    </div>
  );
}
