'use client'

import { actions } from '@/actions'
import { TypeTransaction } from '@/lib/types'
import { X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useFormState } from 'react-dom'

interface Props {
  TypeTransaction: TypeTransaction
}

export function NewCategoryForm({ TypeTransaction }: Props) {
  const pathname = usePathname()
  const [formState, action] = useFormState(actions.category.create, {
    errors: {},
  })

  return (
    <form
      action={action}
      className="my-5 w-[92%] max-w-md rounded-lg border bg-slate-200 p-2 text-slate-800"
    >
      {/* Metadados */}
      <input type="hidden" name="type" value={TypeTransaction} />

      {/* Cabeçalho */}
      <div className="mb-3 flex items-center justify-between">
        <span className="flex justify-center text-lg text-gray-600">
          Incluir categoria
        </span>
        <Link href={pathname}>
          <X />
        </Link>
      </div>

      {/* Descrição */}
      <div className="flex items-center gap-2">
        <label htmlFor="">Descrição</label>
        <input type="text" name="description" className="w-full" />
      </div>

      {/* Retorno */}
      {formState?.success && <p>Categoria cadastrada com sucesso</p>}

      {/* Botão Salvar */}
      <div>
        <button type="submit" className="submit">
          Salvar
        </button>
      </div>
    </form>
  )
}
