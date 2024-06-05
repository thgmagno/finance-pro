'use client'

import { Loader2 } from 'lucide-react'
import React from 'react'
import { useFormStatus } from 'react-dom'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
}

export function ButtonFormSubmit({ title, ...rest }: Props) {
  const { pending } = useFormStatus()

  const LoadingButton = () => (
    <button disabled {...rest}>
      <span className="flex items-center justify-center gap-1.5">
        <Loader2 className="animate-spin" size={16} />
        Carregando
      </span>
    </button>
  )

  const Button = () => <button {...rest}>{title}</button>

  return pending ? <LoadingButton /> : <Button />
}
