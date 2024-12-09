'use client'

import { actions } from '@/actions'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { useActionState } from 'react'
import { ErrorMessage } from '../ErrorMessage'

export function CreateGroupForm() {
  const [formState, action, isPending] = useActionState(actions.group.create, {
    errors: {},
    success: false,
  })

  const { back } = useRouter()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar grupo</CardTitle>
        <CardDescription>
          Crie um grupo para compartilhar suas finanças com amigos e familiares
        </CardDescription>
      </CardHeader>
      <form action={action}>
        <CardContent>
          <div>
            <Label htmlFor="name">Nome do grupo</Label>
            <Input type="text" id="name" name="name" />
            <ErrorMessage message={formState.errors.name} />
          </div>
          <ErrorMessage message={formState.errors._form} />
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button type="button" onClick={back} variant="outline">
            Cancelar
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Carregando...' : 'Criar grupo'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
