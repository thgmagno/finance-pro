'use client'

import { Category } from '@/lib/types'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

interface Props {
  options: Category[]
  isInvalid?: boolean
  errorMessage?: string[]
}

export function SelectCategory({ options, isInvalid, errorMessage }: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentParams = new URLSearchParams(searchParams.toString())
  const incluirParam = currentParams.get('incluir')

  if (incluirParam) {
    if (!incluirParam.includes('categoria')) {
      currentParams.set('incluir', `${incluirParam},categoria`)
    } else {
      currentParams.set('incluir', 'categoria')
    }
  }

  const newSearch = currentParams.toString()

  return (
    <div className="flex flex-col space-y-2 md:flex-row md:items-center">
      <label htmlFor="category" className="md:w-40">
        Categoria
      </label>
      <div className="relative flex flex-1">
        <select
          name="category"
          id="category"
          className={`flex-1 rounded p-2 shadow ${isInvalid ? 'border-2 border-red-500 outline-none' : 'outline-slate-400'}`}
        >
          <option value={0} selected disabled>
            Selecionar
          </option>
          {options?.length >= 1 &&
            options.map((item) => (
              <option key={item.id} value={item.id}>
                {item.description}
              </option>
            ))}
        </select>
        <Link
          href={`${pathname}?${newSearch}`}
          className="ml-2 rounded-full border bg-emerald-400 p-1 text-slate-100"
          aria-label="Incluir categoria"
        >
          <Plus />
        </Link>
        {errorMessage && (
          <span className="absolute bottom-1 right-16 text-sm text-red-500">
            {errorMessage}
          </span>
        )}
      </div>
    </div>
  )
}
