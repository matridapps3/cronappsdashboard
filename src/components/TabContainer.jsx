"use client"

import DynamicAppTab from "@/components/AppTabs/DynamicAppTab";

export default function TabContainer({ activeApp }) {
  if (!activeApp) {
    return <div className="flex-1 bg-slate-50 dark:bg-slate-950" />;
  }

  return (
    <div className="flex-1 h-full min-h-0 overflow-y-auto bg-slate-50 dark:bg-slate-950">
      <div key={activeApp.id} className="animate-fadeIn">
        <DynamicAppTab 
          columnName={activeApp.columnName} 
          displayName={activeApp.name}
        />
      </div>
    </div>
  );
}
