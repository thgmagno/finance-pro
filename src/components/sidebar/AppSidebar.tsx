'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import { EndSession } from './EndSession'
import { Options } from './Options'

export function AppSidebar() {
  const { toggleSidebar } = useSidebar()

  const handleClick = () => {
    if (window.innerWidth < 768) {
      toggleSidebar()
    }
  }

  return (
    <Sidebar className="bg-zinc-100">
      <SidebarContent className="max-h-[calc(100vh-32px)] overflow-y-auto pb-8">
        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {Options.map((option) => (
                <SidebarMenuItem key={option.title}>
                  <SidebarMenuButton asChild onClick={handleClick}>
                    <Link href={option.url}>
                      <option.icon />
                      <span>{option.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenuItem>
                <EndSession />
              </SidebarMenuItem>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
