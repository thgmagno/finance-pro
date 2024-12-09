'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { SessionPayload } from '@/lib/types'
import { Trash2 } from 'lucide-react'

interface ConfigAccountProps {
  session: SessionPayload
}

export function ConfigAccount({ session }: ConfigAccountProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações da conta</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <form action="">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="flex flex-col gap-2">
              <span>Nome</span>
              <Input
                defaultValue={session?.name}
                className="readonly:ring-0"
                readOnly
              />
            </div>
            <div className="flex flex-col gap-2">
              <span>Nome de usuário</span>
              <Input
                defaultValue={session?.username}
                className="readonly:ring-0"
                readOnly
              />
            </div>
          </div>
          <div className="config-button-group">
            <Button variant="outline">Alterar meus dados pessoais</Button>
            <Button variant="outline">Alterar a minha senha</Button>
            <Button variant="destructive">
              <Trash2 className="h-4 w-4" />
              Excluir minha conta
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
