"use client"

import Sidebar from "@/components/Sidebar";
import TabContainer from "@/components/TabContainer";
import { useState, useEffect } from "react";

export default function Home() {
  const [apps, setApps] = useState([]);
  const [activeApp, setActiveApp] = useState(null);

  useEffect(() => {
    async function fetchApps() {
      try {
        const response = await fetch("/api/data/");
        const result = await response.json();

        const appsData = result.map((row) => {
          const appName = row.app_name;
          return {
            id: String(appName || ""),
            name: appName,
            columnName: appName,
          };
        });

        setApps(appsData);
        if (appsData.length > 0) {
          setActiveApp((prev) => prev || appsData[0]);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchApps();
  }, []);

  return (
    <div className="pt-16 flex h-screen min-h-0 overflow-hidden bg-slate-50 dark:bg-slate-950 animate-fadeIn">
      <Sidebar 
        onAppClick={setActiveApp} 
        activeTab={activeApp?.id} 
        apps={apps}
      />
      <TabContainer activeApp={activeApp} />
    </div>
  );
}