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
        const response = await fetch("/api/data");
        const result = await response.json();
        
        const appsData = result.columns.map((col) => ({
          id: col.name.toLowerCase().replace(/\s+/g, "-"),
          name: col.displayName || col.name,
          columnName: col.name,
        }));
        
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
    <div className="pt-16 flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar 
        onAppClick={setActiveApp} 
        activeTab={activeApp?.id} 
        apps={apps} 
      />
      <TabContainer activeApp={activeApp} />
    </div>
  );
}