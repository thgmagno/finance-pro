'use client'

import { useSidebarStore } from '@/hooks/use-sidebar-store'
import { cn } from '@/lib/utils'

interface BalanceProps {
  balance: number
}

export function Balance({ balance }: BalanceProps) {
  const { position } = useSidebarStore()

  if (position === 'top-right') {
    return (
      <div className="mr-3 flex cursor-default items-center gap-2 p-2 md:mr-5">
        <span className="text-sm text-muted-foreground">Saldo</span>
        <span
          className={cn(
            'text-sm',
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

  if (position === 'bottom-right') {
    return (
      <div className="fixed bottom-2 right-2 flex cursor-default items-center gap-2 rounded-md border p-2 backdrop-blur-sm">
        <span className="text-sm text-muted-foreground">Saldo</span>
        <span
          className={cn(
            'text-sm',
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

  return null
}
