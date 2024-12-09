'use client'

import { actions } from '@/actions'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useActionState } from 'react'
import { ErrorMessage } from '../ErrorMessage'

export default function RegisterForm() {
  const [formState, action, isPending] = useActionState(actions.auth.register, {
    errors: {},
  })

  return (
    <Card className="w-[96%] max-w-[320px]">
      <CardHeader>
        <CardTitle>Crie sua conta</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action}>
          <div>
            <Label>Nome</Label>
            <Input type="text" name="name" />
            <ErrorMessage message={formState.errors.name} />
          </div>
          <div>
            <Label>
              Nome de usuário{' '}
              <span className="text-sm text-muted-foreground">
                (precisa ser único)
              </span>
            </Label>
            <Input type="text" name="username" />
            <ErrorMessage message={formState.errors.username} />
          </div>
          <div>
            <Label>Senha</Label>
            <Input type="password" name="password" />
            <ErrorMessage message={formState.errors.password} />
          </div>
          <div>
            <Label>Confirmar senha</Label>
            <Input type="password" name="confirmPassword" />
            <ErrorMessage message={formState.errors.confirmPassword} />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Carregando...' : 'Criar conta'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center">
        <p className="cursor-default text-sm text-muted-foreground">
          Já tem uma conta?{' '}
          <Link href="/entrar" className="text-emerald-500 underline">
            Acesse sua conta
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
