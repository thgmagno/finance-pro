'use client'

import { actions } from '@/actions'
import { Category, TypeTransaction } from '@/lib/types'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useFormState } from 'react-dom'
import { ButtonFormSubmit } from '../button/FormSubmit'

interface Props {
  TypeTransaction: TypeTransaction
  recurrent: boolean
  setRecurrent: (value: boolean) => void
  categories: Category[]
}

export function NewTransactionForm({
  TypeTransaction,
  recurrent,
  setRecurrent,
  categories,
}: Props) {
  const [formState, action] = useFormState(actions.transaction.create, {
    errors: {},
  })

  const pathname = usePathname()
  const options = categories.filter((item) => item.type === TypeTransaction)

  return (
    <form
      action={action}
      className="my-5 rounded-lg border bg-slate-200 p-2 text-slate-800"
    >
      {/* Metadados */}
      <input type="hidden" name="type" value={TypeTransaction} />

      {/* Categoria */}
      <div className="input-wrapper">
        <label htmlFor="" className="md:w-40">
          Categoria
        </label>
        <div className="flex flex-1">
          <select name="category" id="category" className="flex-1">
            <option value={-1} selected disabled>
              Selecionar
            </option>
            {options?.length >= 1 &&
              options.map((item) => (
                <option key={item.id}>{item.description}</option>
              ))}
          </select>
          <Link
            href={{ pathname, query: { incluir: 'categoria' } }}
            className="ml-2 rounded-full border bg-emerald-400 p-1 text-slate-100"
            aria-label="Incluir categoria"
          >
            <Plus />
          </Link>
        </div>
      </div>

      {/* Descrição */}
      <div className="input-wrapper">
        <label htmlFor="" className="md:w-40">
          Descrição
        </label>
        <input type="text" placeholder="Descrição" className="md:flex-1" />
      </div>

      {/* Recorrente */}
      <div className="input-wrapper">
        <label htmlFor="" className="md:w-40">
          Valor
        </label>
        <input type="text" placeholder="R$ 0,00" className="md:flex-1" />
      </div>
      <div className="checkbox-wrapper">
        <label htmlFor="" className="md:w-40">
          Recorrente?
        </label>
        <input
          type="checkbox"
          checked={recurrent}
          onChange={(e) => setRecurrent(e.target.checked)}
          className="h-5 w-5 cursor-pointer"
        />
      </div>
      {recurrent && (
        <div className="input-wrapper">
          <label htmlFor="" className="md:w-40">
            Selecione os meses
          </label>
          <div className="md:flex-1"></div>
        </div>
      )}

      {/* Botão Salvar */}
      <ButtonFormSubmit title="Salvar" className="submit" />
    </form>
  )
}
