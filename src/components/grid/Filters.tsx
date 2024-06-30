'use client'

import { monthToString } from '@/utils/monthToString'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

interface Props {
  months: number[]
  years: number[]
  categories: string[]
}

export function GridFilters({ months, years, categories }: Props) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const date = new Date()
  const currentMonth = date.getMonth()
  const currentYear = date.getFullYear()

  useEffect(() => {
    const params = new URLSearchParams(searchParams)

    params.set('mes', String(currentMonth + 1))
    params.set('ano', currentYear.toString())
    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }, [])

  function handleMonthChange(month: string) {
    const params = new URLSearchParams(searchParams)

    if (month) {
      params.set('mes', String(Number(month) + 1))
    } else {
      params.delete('mes')
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  function handleYearChange(year: string) {
    const params = new URLSearchParams(searchParams)

    if (year) {
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

  return (
    <div className="relative my-5 flex flex-col gap-3 md:flex-row md:items-center">
      {/* Meses */}
      <label>Mês:</label>
      <select
        onChange={(e) => handleMonthChange(e.target.value)}
        defaultValue={currentMonth}
        className="h-8 rounded-md bg-slate-800 p-1.5"
        aria-label="Selecionar mês"
        title="Selecionar mês"
      >
        <option value="">Todos</option>
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
        defaultValue={currentYear}
        className="h-8 rounded-md bg-slate-800 p-1.5"
        aria-label="Selecionar ano"
        title="Selecionar ano"
      >
        <option value="">Todos</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      {/* Anos */}
      <label>Categorias:</label>
      <select
        onChange={(e) => handleCategoryChange(e.target.value)}
        className="h-8 rounded-md bg-slate-800 p-1.5"
        aria-label="Selecionar ano"
        title="Selecionar ano"
      >
        <option value="">Todos</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  )
}
