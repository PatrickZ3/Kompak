"use client"

import { IconCirclePlus,  type Icon } from "@tabler/icons-react"
import { useState } from "react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { NewStoryModal } from "./ui/new-story-modal"

export function NavMain({
  items,
  activeView,
  onNavigate,
  boardId,
  onRefreshTasks,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
  activeView?: string
  onNavigate?: (viewName: string) => void
  boardId: number | string
  onRefreshTasks?: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <SidebarGroup className="pt-0">
      <SidebarGroupContent className="flex flex-col">
        <SidebarMenu>
          <div className="pt-2 pb-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="cursor-pointer min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
              onClick={() => setIsModalOpen(true)}
            >
              <IconCirclePlus className="mr-2 !h-5 !w-5" />
              <span>New Story</span>
            </SidebarMenuButton>
          </div>

          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton className="text-sm font-medium cursor-pointer" tooltip={item.title} isActive={activeView === item.title} onClick={() => onNavigate?.(item.title)}>
                {item.icon && <item.icon className="mr-2 !h-5 !w-5" />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}   
        </SidebarMenu>
      </SidebarGroupContent>
      <NewStoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}  boardId={boardId} onStoryCreated={onRefreshTasks}/>
    </SidebarGroup>
  )
}
