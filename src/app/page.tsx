"use client"
import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import Board from "@/components/board";
import Timeline from "@/components/time-line";
import Team from "@/components/team";

export default function Home() {

  const [activeView, setActiveView] = useState("Board")

  const handleNavigate = (viewName: string) => {
    setActiveView(viewName)
  }

  return (
    <SidebarProvider>
      <AppSidebar
        variant="inset"
        activeView={activeView}
        onNavigate={handleNavigate}
      />
      <SidebarInset>
        {activeView === "Board" && <Board />}
        {activeView === "Timeline" && <Timeline />}
        {activeView === "Team" && <Team />}
      </SidebarInset>
    </SidebarProvider>
  );
}
