'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'
import { NewTransactionForm } from './NewTransactionForm'
import { NewCategoryForm } from './NewCategoryForm'
import { usePathname, useSearchParams } from 'next/navigation'
import { Category } from '@/lib/types'
import Link from 'next/link'

interface Props {
  userId: string
  categories: Category[]
}

export function NewTransactionFormBtn({ userId, categories }: Props) {
  const [recurrent, setRecurrent] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const formParams = searchParams.get('incluir')?.split(',') || []
  const showTransactionForm =
    formParams.includes('despesa') || formParams.includes('receita')
  const showCategoryForm = formParams.includes('categoria')

  const TypeTransaction = pathname.includes('despesa') ? 'EXPENSE' : 'INCOME'

  return (
    <>
      {showTransactionForm ? (
        <>
          <div className="flex justify-end">
            <Link
              href={pathname}
              className="flex h-9 items-center gap-1 rounded border border-slate-700 bg-neutral-800/30 px-2 font-medium"
            >
              Cancelar
            </Link>
          </div>

          {/* Formulário Principal */}
          <NewTransactionForm
            userId={userId}
            TypeTransaction={TypeTransaction}
            recurrent={recurrent}
            setRecurrent={setRecurrent}
            categories={categories}
          />

          {/* Formulário Secundário */}
          {showCategoryForm && (
            <div className="absolute left-0 top-0 z-50 min-h-screen w-full flex-1 bg-neutral-900/95">
              <div className="flex items-center justify-center py-12">
                <NewCategoryForm
                  userId={userId}
                  TypeTransaction={TypeTransaction}
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-end">
          <Link
            href={{
              pathname,
              query: {
                incluir: pathname.includes('despesa') ? 'despesa' : 'receita',
              },
            }}
            className="ml-auto flex h-9 items-center gap-1 rounded border border-slate-700 bg-green-700 px-2 font-medium"
          >
            <Plus size={18} />
            Inserir
          </Link>
        </div>
      )}
    </>
  )
}
