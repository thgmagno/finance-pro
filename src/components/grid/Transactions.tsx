'use client'

import { Transaction } from '@/lib/types'
import { currencyBRL } from '@/utils/currencyBRL'
import { monthToString } from '@/utils/monthToString'
import { translateStatusBRL } from '@/utils/translateStatusBRL'
import { useState } from 'react'

interface Props {
  data: Transaction[]
  itemsPerPage: number
}

export function GridTransactions({ data, itemsPerPage }: Props) {
  const [currentPage, setCurrentPage] = useState(1)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil(data.length / itemsPerPage)

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1)
  }

  return (
    <>
      <div className="mt-8 flex items-center space-x-3 pb-3">
        <span>Filtrar por:</span>
        <select className="rounded-md bg-slate-800 p-1.5">
          <option value="">Data</option>
          <option value="">Categoria</option>
        </select>
      </div>
      <div className="no-scrollbar flex flex-col overflow-scroll rounded bg-slate-800">
        <table className="w-full border-b-2">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Mês</th>
              <th>Ano</th>
              <th>Status</th>
              <th>Categoria</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((row) => (
              <tr key={row.id}>
                <td>{row.description}</td>
                <td>{currencyBRL(row.amount)}</td>
                <td>{monthToString(row.month)}</td>
                <td>{row.year}</td>
                <td>{translateStatusBRL(row.status)}</td>
                <td>{row.categoryId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mb-10 flex items-baseline justify-between py-2">
        <span className="text-sm">
          Página {currentPage} de {totalPages}
        </span>
        <div className="space-x-3">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="rounded-md bg-slate-300 px-2 font-normal text-neutral-600 shadow active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-800"
          >
            Anterior
          </button>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="rounded-md bg-slate-300 px-2 font-normal text-neutral-600 shadow active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-800"
          >
            Próxima
          </button>
        </div>
      </div>
    </>
  )
}
