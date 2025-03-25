"use client"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/ModeToggle";


export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
      <div className="absolute top-4 right-4">
          <ModeToggle />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
