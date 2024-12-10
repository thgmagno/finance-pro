'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useSidebarStore } from '@/hooks/use-sidebar-store'
import { useEffect, useState } from 'react'

export function ConfigSystem() {
  const [mounted, setMounted] = useState(false)

  const [theme, setTheme] = useState<'light' | 'dark' | 'device'>(
    (localStorage.getItem('theme') as 'light' | 'dark' | 'device') || 'light',
  )

  const { position, setPosition } = useSidebarStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações do sistema</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>Tema</Label>
          <Select
            defaultValue={theme}
            onValueChange={(value) =>
              setTheme(value as 'light' | 'dark' | 'device')
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent defaultValue="light">
              <SelectItem value="light">Claro</SelectItem>
              <SelectItem value="dark">Escuro</SelectItem>
              <SelectItem value="device">Dispositivo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Posição do saldo</Label>
          <Select
            defaultValue={position}
            onValueChange={(value) =>
              setPosition(
                value as
                  | 'top-right'
                  | 'bottom-right'
                  | 'navigation-bar'
                  | 'hidden',
              )
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent defaultValue="top-right">
              <SelectItem value="top-right">Canto superior direito</SelectItem>
              <SelectItem value="bottom-right">
                Canto inferior direito
              </SelectItem>
              <SelectItem value="navigation-bar">
                Na barra de navegação
              </SelectItem>
              <SelectItem value="hidden">Ocultar saldo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
