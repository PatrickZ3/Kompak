"use client"

import { IconCirclePlusFilled, IconCirclePlus, IconMail, type Icon } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}) {
  return (
    <SidebarGroup className="pt-0">
      <SidebarGroupContent className="flex flex-col">
        <SidebarMenu>
          <div className="pt-2 pb-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="cursor-pointer min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
            >
              <IconCirclePlus className="mr-2 !h-5 !w-5" />
              <span>New Story</span>
            </SidebarMenuButton>
          </div>

          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton className="text-sm font-medium cursor-pointer" tooltip={item.title}>
                {item.icon && <item.icon className="mr-2 !h-5 !w-5" />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
