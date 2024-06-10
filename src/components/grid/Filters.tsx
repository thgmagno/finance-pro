'use client'

import { Filter, Transaction } from '@/lib/types'
import { monthToString } from '@/utils/monthToString'
import { RefreshCcw, Search } from 'lucide-react'

interface Props {
  data: Transaction[]
  filters: Filter
  setFilters: (filter: Filter) => void
  setCurrentPage: (value: number) => void
  clearFilters: () => void
  isEqual: boolean
}

export function GridFilters({
  data,
  filters,
  setFilters,
  setCurrentPage,
  clearFilters,
  isEqual,
}: Props) {
  const extractDataMonths = Array.from(
    new Set(data.map((item) => item.month)),
  ).reverse()

  const extractDataYears = Array.from(
    new Set(data.map((item) => item.year)),
  ).reverse()

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({
      ...filters,
      month: event.target.value,
    })
    setCurrentPage(1)
  }

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({
      ...filters,
      year: event.target.value,
    })
    setCurrentPage(1)
  }

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({
      ...filters,
      status: event.target.value,
    })
    setCurrentPage(1)
  }

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFilters({
      ...filters,
      searchTerm: event.target.value,
    })
  }

  return (
    <div className="relative flex flex-col gap-3 md:flex-row md:items-center">
      <span>Filtrar:</span>

      {/* Meses */}
      <select
        value={filters.month}
        onChange={handleMonthChange}
        className="h-8 rounded-md bg-slate-800 p-1.5"
        aria-label="Selecionar mês"
        title="Selecionar mês"
      >
        <option value="">Todos</option>
        {extractDataMonths.map((month) => (
          <option key={month} value={month.toString()}>
            {monthToString(month)}
          </option>
        ))}
      </select>

      {/* Anos */}
      <select
        value={filters.year}
        onChange={handleYearChange}
        className="h-8 rounded-md bg-slate-800 p-1.5"
        aria-label="Selecionar ano"
        title="Selecionar ano"
      >
        {extractDataYears.map((year) => (
          <option key={year} value={year.toString()}>
            {year}
          </option>
        ))}
      </select>

      {/* Status */}
      <select
        value={filters.status}
        onChange={handleStatusChange}
        className="h-8 rounded-md bg-slate-800 p-1.5"
        aria-label="Selecionar status"
        title="Selecionar status"
      >
        <option value="">Status</option>
        <option value="OK">Baixado</option>
        <option value="PENDING">Pendente</option>
        <option value="OVERDUE">Atrasado</option>
      </select>

      {/* Termo */}
      <div
        className="relative flex h-8 rounded-md bg-slate-800 p-1.5"
        aria-label="Buscar palavra chave"
        title="Buscar palavra chave"
      >
        <input
          type="text"
          value={filters.searchTerm}
          onChange={handleSearchTermChange}
          className="bg-transparent outline-none"
          placeholder="Pesquisar"
        />
        <Search className="absolute right-1" size={20} />
      </div>

      {/* Limpar */}
      {!isEqual && (
        <div
          title="Redefinir filtros"
          className="absolute right-0 top-0 cursor-pointer md:relative"
        >
          <RefreshCcw
            onClick={clearFilters}
            size={20}
            className="opacity-60"
            aria-label="Redefinir filtros"
          />
        </div>
      )}
    </div>
  )
}
