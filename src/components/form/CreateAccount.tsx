'use client'

import { useFormState } from 'react-dom'
import { ButtonFormSubmit } from '@/components/button/FormSubmit'
import { actions } from '@/actions'
import { InputText } from '../input/Text'
import { InputPassword } from '../input/Password'
import Link from 'next/link'

export function CreateAccountForm() {
  const [formState, action] = useFormState(actions.auth.createAccount, {
    errors: {},
  })

  return (
    <form
      action={action}
      className="flex w-full max-w-sm flex-col space-y-5 rounded-lg bg-slate-200 p-5 shadow"
    >
      <InputText
        name="name"
        label="Nome"
        isInvalid={!!formState?.errors.name}
        errorMessage={formState?.errors.name}
        capitalize="auto"
      />
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
        confirmationIsInvalid={!!formState?.errors.confirmPassword}
        confirmationErrorMessage={formState?.errors.confirmPassword}
        withConfirmation
      />
      <ButtonFormSubmit title="Criar conta" />
      <div className="flex justify-center text-sm hover:underline">
        <Link href="/entrar">já tenho uma conta</Link>
      </div>
    </form>
  )
}
