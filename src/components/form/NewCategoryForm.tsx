'use client'

import { actions } from '@/actions'
import { TypeTransaction } from '@/lib/types'
import { X } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useFormState } from 'react-dom'
import { ButtonFormSubmit } from '../button/FormSubmit'
import { InputText } from '../input/Text'

interface Props {
  userId: string
  TypeTransaction: TypeTransaction
}

export function NewCategoryForm({ userId, TypeTransaction }: Props) {
  const [formState, action] = useFormState(actions.category.create, {
    errors: {},
  })

  const pathname = usePathname()
  const incluirParam = useSearchParams().get('incluir')?.split(',')[0] ?? ''

  return (
    <form
      action={action}
      className="my-5 w-[92%] max-w-md rounded-lg border bg-slate-200 p-2 text-slate-800"
    >
      {/* Metadados */}
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="type" value={TypeTransaction} />

      {/* Cabeçalho */}
      <div className="mb-3 flex items-center justify-between">
        <span className="flex justify-center text-lg text-gray-600">
          Incluir categoria
        </span>
        <Link href={{ pathname, query: { incluir: incluirParam } }}>
          <X />
        </Link>
      </div>

      {/* Descrição */}
      <InputText
        name="description"
        label="Descrição"
        isInvalid={!!formState?.errors.description}
        errorMessage={formState?.errors.description}
        wFull
        capitalize="auto"
      />

      {/* Retorno */}
      {formState?.success && <p>Categoria cadastrada com sucesso</p>}

      {/* Botão Salvar */}
      <ButtonFormSubmit title="Salvar" />
    </form>
  )
}
