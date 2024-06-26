'use client'

import { monthToString } from '@/utils/monthToString'
import { Category } from '@prisma/client'
import { RefreshCcw } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface Props {
  months: number[]
  years: number[]
  categories: Category[]
}

export function GridFilters({ months, years, categories }: Props) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { refresh, replace } = useRouter()
  const date = new Date()
  const currentMonth = date.getMonth()
  const currentYear = date.getFullYear()

  function handleMonthChange(month: string) {
    const params = new URLSearchParams(searchParams)

    if (month && isNaN(Number(month))) {
      params.set('mes', 'todos')
    } else if (month && Number(month) !== currentMonth) {
      params.set('mes', String(Number(month) + 1))
    } else {
      params.delete('mes')
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  function handleYearChange(year: string) {
    const params = new URLSearchParams(searchParams)

    if (year && isNaN(Number(year))) {
      params.set('ano', 'todos')
    } else if (year && Number(year) !== currentYear) {
      params.set('ano', String(Number(year)))
    } else {
      params.delete('ano')
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  function handleCategoryChange(category: string) {
    const params = new URLSearchParams(searchParams)

    if (category) {
      params.set('categoria', category)
    } else {
      params.delete('categoria')
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  function handleStatusChange(status: string) {
    const params = new URLSearchParams(searchParams)

    if (status) {
      params.set('status', status)
    } else {
      params.delete('status')
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  function resetFilters() {
    refresh()
    replace(pathname, { scroll: false })
  }

  return (
    <div className="relative mt-5 flex flex-col gap-3 md:flex-row md:items-center">
      {/* Meses */}
      <label>Mês:</label>
      <select
        onChange={(e) => handleMonthChange(e.target.value)}
        value={
          searchParams.get('mes')
            ? Number(searchParams.get('mes')) - 1
            : currentMonth
        }
        className="h-8 cursor-pointer rounded-md bg-slate-800 p-1.5"
        aria-label="Selecionar mês"
        title="Selecionar mês"
      >
        <option value="todos">Todos</option>
        {months.map((month) => (
          <option key={month} value={month}>
            {monthToString(month)}
          </option>
        ))}
      </select>

      {/* Anos */}
      <label>Ano:</label>
      <select
        onChange={(e) => handleYearChange(e.target.value)}
        value={Number(searchParams.get('ano')) || currentYear}
        className="h-8 cursor-pointer rounded-md bg-slate-800 p-1.5"
        aria-label="Selecionar ano"
        title="Selecionar ano"
      >
        <option value="todos">Todos</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      {/* Categorias */}
      <label>Categorias:</label>
      <select
        onChange={(e) => handleCategoryChange(e.target.value)}
        value={searchParams.get('categoria') || ''}
        className="h-8 cursor-pointer rounded-md bg-slate-800 p-1.5"
        aria-label="Selecionar ano"
        title="Selecionar ano"
      >
        <option value="">Todos</option>
        {categories.map((category) => (
          <option key={category.description} value={category.description}>
            {category.description}
          </option>
        ))}
      </select>

      {/* Status */}
      <label>Status:</label>
      <select
        onChange={(e) => handleStatusChange(e.target.value)}
        value={searchParams.get('status') || ''}
        className="h-8 cursor-pointer rounded-md bg-slate-800 p-1.5"
        aria-label="Selecionar status"
        title="Selecionar status"
      >
        <option value="">Todos</option>
        <option value="pendentes">Pendentes</option>
      </select>

      {searchParams.size >= 1 && (
        <button
          onClick={resetFilters}
          className="flex h-8 w-full items-center justify-center gap-2 rounded-lg border border-neutral-500 text-neutral-300 md:w-10"
        >
          <RefreshCcw size={20} />
          <span className="md:hidden">Redefinir filtros</span>
        </button>
      )}
    </div>
  )
}
