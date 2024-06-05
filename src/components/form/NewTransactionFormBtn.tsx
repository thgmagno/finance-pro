'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'
import { NewTransactionForm } from './NewTransactionForm'
import { NewCategoryForm } from './NewCategoryForm'
import { usePathname, useSearchParams } from 'next/navigation'
import { Category } from '@/lib/types'

interface Props {
  categories: Category[]
}

export function NewTransactionFormBtn({ categories }: Props) {
  const [form, setForm] = useState(false)
  const [recurrent, setRecurrent] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const TypeTransaction = pathname.includes('despesa') ? 'EXPENSE' : 'INCOME'
  const formCategory = searchParams.get('incluir') === 'categoria'

  return (
    <>
      {form ? (
        <>
          <button
            onClick={() => setForm(false)}
            className="ml-auto flex h-9 items-center gap-1 rounded border border-slate-700 bg-neutral-800/30 px-2 font-medium"
          >
            Cancelar
          </button>

          {/* Formulário Principal */}
          <NewTransactionForm
            TypeTransaction={TypeTransaction}
            recurrent={recurrent}
            setRecurrent={setRecurrent}
            categories={categories}
          />

          {/* Formulário Secundário */}
          {formCategory && (
            <div className="absolute left-0 top-0 z-50 min-h-screen w-full flex-1 bg-neutral-900/95">
              <div className="flex items-center justify-center py-12">
                <NewCategoryForm TypeTransaction={TypeTransaction} />
              </div>
            </div>
          )}
        </>
      ) : (
        <button
          onClick={() => setForm(true)}
          className="ml-auto flex h-9 items-center gap-1 rounded border border-slate-700 bg-green-700 px-2 font-medium"
        >
          <Plus size={18} />
          Inserir
        </button>
      )}
    </>
  )
}
