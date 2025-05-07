"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import {
  IconClockHour4,
  IconDashboard,
  IconSettings,
  IconUsers,
  IconArrowLeft
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { supabase } from "@/lib/supabaseClient"


const data = {
  navMain: [
    {
      title: "Board",
      url: "#",
      icon: IconDashboard,
    },
    {
      title: "Timeline",
      url: "#",
      icon: IconClockHour4,
    },
    {
      title: "Team",
      url: "#",
      icon: IconUsers,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },

  ],
}

export function AppSidebar({
  activeView,
  onNavigate,
  boardTitle = "Untitled Project",
  boardId,
  onRefreshTasks,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  activeView?: string
  onNavigate?: (viewName: string) => void
  boardTitle?: string
  boardId: string | number
  onRefreshTasks?: () => void;
}) {

  const [user, setUser] = useState({
    name: "Default User",
    email: "default@example.com",
    avatar: "/default.jpeg",
  });

  useEffect(() => {
    const getUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        console.error("Failed to get user:", error);
        return;
      }

      setUser({
        name:
          user.user_metadata.name ||
          `${user.user_metadata.firstName ?? ""} ${user.user_metadata.lastName ?? ""}`.trim() ||
          user.email?.split("@")[0] || "User",
        email: user.email || "unknown",
        avatar: user.user_metadata.avatar_url || "/default.jpeg",
      });
    };

    getUser();
  }, []);
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/dashboard" className="flex items-center gap-2 rounded-md px-3 py-2 text-secondary-foreground hover:bg-muted hover:text-foreground transition-colors">
                <IconArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Back to Dashboard</span>
              </a>
            </SidebarMenuButton>

          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} activeView={activeView} onNavigate={onNavigate} boardId={boardId} onRefreshTasks={onRefreshTasks} />
        <NavSecondary items={data.navSecondary} className="mt-auto " />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
