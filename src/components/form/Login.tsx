'use client'

import { useFormState } from 'react-dom'
import { ButtonFormSubmit } from '@/components/button/FormSubmit'
import { actions } from '@/actions'
import { InputText } from '../input/Text'
import { InputPassword } from '../input/Password'
import Link from 'next/link'

export function LoginForm() {
  const [formState, action] = useFormState(actions.auth.login, {
    errors: {},
  })

  return (
    <form
      action={action}
      className="flex w-full max-w-sm flex-col space-y-5 rounded-lg bg-slate-200 p-5 shadow"
    >
      <InputText
        name="username"
        label="Usuário"
        isInvalid={!!formState?.errors.username}
        errorMessage={formState?.errors.username}
        capitalize="lowerNoSpaces"
      />
      <InputPassword
        isInvalid={!!formState?.errors.password}
        errorMessage={formState?.errors.password}
      />
      <ButtonFormSubmit title="Acessar" />
      <div className="flex justify-center text-sm hover:underline">
        <Link href="/cadastrar">ainda não tenho uma conta</Link>
      </div>
    </form>
  )
}
