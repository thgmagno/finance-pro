'use client'

import { actions } from '@/actions'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useActionState, useState } from 'react'
import { ErrorMessage } from '../ErrorMessage'

export default function LoginForm() {
  const [isVisitorLoading, setIsVisitorLoading] = useState(false)

  const [formState, action, isPending] = useActionState(actions.auth.login, {
    errors: {},
  })

  const handleVisitorLogin = async () => {
    setIsVisitorLoading(true)
    await actions.session.createVisitorSession()
    setIsVisitorLoading(false)
  }

  return (
    <Card className="w-[96%] max-w-[320px]">
      <CardHeader>
        <CardTitle>Acesse sua conta</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action}>
          <div>
            <Label>Usuário</Label>
            <Input type="text" name="username" />
            <ErrorMessage message={formState.errors.username} />
          </div>
          <div>
            <Label>Senha</Label>
            <Input type="password" name="password" />
            <ErrorMessage message={formState.errors.password} />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Carregando...' : 'Entrar'}
          </Button>
          <Button
            onClick={handleVisitorLogin}
            variant="outline"
            className="w-full"
            type="button"
            disabled={isVisitorLoading}
          >
            {isVisitorLoading ? 'Carregando...' : 'Entre como visitante'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center">
        <p className="cursor-default text-sm text-muted-foreground">
          Não tem uma conta?{' '}
          <Link href="/cadastrar" className="text-emerald-500 underline">
            Cadastre-se
          </Link>
        </p>
        <Link
          href="/conheca-o-projeto"
          className={cn('mt-5', buttonVariants({ variant: 'link' }))}
        >
          Conheça o projeto
        </Link>
      </CardFooter>
    </Card>
  )
}
