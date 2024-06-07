'use client'

import { Transaction } from '@/lib/types'
import { currencyBRL } from '@/utils/currencyBRL'
import { monthToString } from '@/utils/monthToString'
import { Circle } from 'lucide-react'
import { useState } from 'react'
import { DeleteBox } from '../dialog/DeleteBox'
import { getStatusColor } from '@/utils/getStatusColor'
import { SelectStatus } from '../select/Status'
import { GridFilters, initialState } from './Filters'
import { normalizeString } from '@/utils/normalizeString'

interface Props {
  data: Transaction[]
  itemsPerPage: number
}

export function GridTransactions({ data, itemsPerPage }: Props) {
  const [filters, setFilters] = useState(initialState)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedTransactions, setSelectedTransactions] = useState<
    Transaction[]
  >([])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  const filteredData = data.filter((item) => {
    const matchesMonth = filters.month
      ? item.month === parseInt(filters.month)
      : true
    const matchesYear = filters.year
      ? item.year === parseInt(filters.year)
      : true
    const matchesSearchTerm = filters.searchTerm
      ? normalizeString(item.description).includes(
          normalizeString(filters.searchTerm),
        ) ||
        normalizeString(item.category.description).includes(
          normalizeString(filters.searchTerm),
        )
      : true
    return matchesMonth && matchesYear && matchesSearchTerm
  })

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const totalAmount = filteredData.reduce(
    (acc, transaction) => acc + transaction.amount,
    0,
  )

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1)
  }

  const handleSelectTransaction = (transaction: Transaction) => {
    setSelectedTransactions((prevSelected) => {
      const alreadySelected = prevSelected.find((t) => t.id === transaction.id)
      if (alreadySelected) {
        return prevSelected.filter((t) => t.id !== transaction.id)
      } else {
        return [...prevSelected, transaction]
      }
    })
  }

  const sumSelectedTransactions = selectedTransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0,
  )

  return (
    <>
      <div className="flex items-center justify-between">
        <GridFilters
          data={data}
          filters={filters}
          setFilters={setFilters}
          setCurrentPage={setCurrentPage}
        />
        <div className="mt-4">
          <span>
            Total: <b>{currencyBRL(totalAmount)}</b>
          </span>
        </div>
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
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((row) => (
              <tr key={row.id} className={`${getStatusColor(row.status)}`}>
                <td>{row.description}</td>
                <td>{currencyBRL(row.amount)}</td>
                <td>{monthToString(row.month)}</td>
                <td>{row.year}</td>
                <td>
                  <SelectStatus transaction={row} />
                </td>
                <td>{row.category.description}</td>
                <td className="flex items-center justify-evenly">
                  <DeleteBox
                    transaction={row}
                    data={data.filter((dt) => dt.uuid === row.uuid)}
                  />
                  <Circle
                    onClick={() => handleSelectTransaction(row)}
                    size={20}
                    className={`cursor-pointer ${
                      selectedTransactions.find((t) => t.id === row.id)
                        ? 'rounded-full bg-green-500 text-slate-900'
                        : ''
                    }`}
                  />
                </td>
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
      {sumSelectedTransactions > 0 && (
        <div className="absolute bottom-3 right-3 rounded-md border-2 border-slate-700 bg-slate-800 px-2.5 py-1.5 shadow-md md:bottom-5 md:right-5">
          Total: {currencyBRL(sumSelectedTransactions)}
        </div>
      )}
    </>
  )
}
