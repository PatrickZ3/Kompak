"use client"
import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import Timeline from "@/components/time-line";
import Team from "@/components/team";
import dynamic from "next/dynamic"

const Board = dynamic(() => import("@/components/board"), {
  ssr: false,
})

export default function Home() {

  const [activeView, setActiveView] = useState("Board")
  const [boardTitle, setBoardTitle] = useState("Loading...");

  useEffect(() => {
    fetch("/api/board")
      .then(res => res.json())
      .then(data => setBoardTitle(data.boardTitle))
      .catch(err => console.error("Failed to fetch board title:", err));
  }, []);

  const handleNavigate = (viewName: string) => {
    setActiveView(viewName)
  }

  return (
    <SidebarProvider>
      <AppSidebar
        variant="inset"
        activeView={activeView}
        onNavigate={handleNavigate}
        boardTitle={boardTitle}
      />
      <SidebarInset>
        {activeView === "Board" && <Board />}
        {activeView === "Timeline" && <Timeline />}
        {activeView === "Team" && <Team />}
      </SidebarInset>
    </SidebarProvider>
  );
}
