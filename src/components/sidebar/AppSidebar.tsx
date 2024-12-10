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
import { useSidebarStore } from '@/hooks/use-sidebar-store'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { EndSession } from './EndSession'
import { Options } from './Options'

interface Props {
  balance: number
}

export function AppSidebar({ balance }: Props) {
  const { toggleSidebar } = useSidebar()
  const { position } = useSidebarStore()

  const handleClick = () => {
    if (window.innerWidth < 768) {
      toggleSidebar()
    }
  }

  return (
    <Sidebar className="bg-zinc-100">
      <SidebarContent className="max-h-[calc(100vh-32px)] overflow-y-auto pb-8">
        <SidebarGroup>
          <SidebarGroupLabel
            className={cn({
              'flex flex-col items-start justify-start':
                position === 'navigation-bar',
            })}
          >
            {position === 'navigation-bar' && (
              <DisplayBalance balance={balance} />
            )}
            <span
              className={cn({
                '-translate-y-2': position === 'navigation-bar',
              })}
            >
              Navegação
            </span>
          </SidebarGroupLabel>
          <SidebarGroupContent
            className={cn({
              'translate-y-1': position === 'navigation-bar',
            })}
          >
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

function DisplayBalance({ balance }: Props) {
  return (
    <div className="ml-auto pt-1">
      <span className="mr-1 text-xs text-muted-foreground">Saldo</span>
      <span
        className={cn(
          'text-xs',
          balance > 0 ? 'text-emerald-600' : 'text-red-600',
        )}
      >
        {new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(balance)}
      </span>
    </div>
  )
}
