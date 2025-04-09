"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import {
  IconClockHour4,
  IconDashboard,
  IconFolder,
  IconSettings,
  IconUsers,
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

export function AppSidebar({ activeView, onNavigate, boardTitle = "Untitled Project",...props }: React.ComponentProps<typeof Sidebar> & {activeView?: string ; onNavigate?: (viewName: string) => void; boardTitle?: string;}) {
  
  const [user, setUser] = useState({
    name: "Default User",
    email: "default@example.com",
    avatar: "/default.jpeg",
  });

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("/api/user");
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error("Failed to fetch user:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    fetchUser();
  }, [])
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <div className="rounded-sm bg-primary p-1 text-primary-foreground">
                  <IconFolder className="!size-4" />
                </div>
                <span className="text-sm font-extrabold">{boardTitle}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} activeView={activeView} onNavigate={onNavigate}/>
        <NavSecondary items={data.navSecondary} className="mt-auto " />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
