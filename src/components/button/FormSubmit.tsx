'use client'

import { Loader2 } from 'lucide-react'
import React from 'react'
import { useFormStatus } from 'react-dom'

interface Props {
  title: string
}

export function ButtonFormSubmit({ title }: Props) {
  const { pending } = useFormStatus()

  const Loading = () => (
    <span className="flex items-center justify-center gap-1.5">
      <Loader2 className="animate-spin" size={16} />
      Carregando
    </span>
  )

  return (
    <button
      disabled={pending}
      className={`mt-3 w-full rounded-lg bg-green-600 p-1 font-medium text-slate-100 ${pending ? 'cursor-not-allowed opacity-50' : 'hover:opacity-90'}`}
    >
      {pending ? <Loading /> : title}
    </button>
  )
}
