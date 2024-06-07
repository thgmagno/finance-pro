'use client'

import { Transaction } from '@/lib/types'
import { currencyBRL } from '@/utils/currencyBRL'
import { monthToString } from '@/utils/monthToString'
import { translateStatusBRL } from '@/utils/translateStatusBRL'
import { Circle, Trash2 } from 'lucide-react'
import { useState } from 'react'

interface Props {
  data: Transaction[]
  itemsPerPage: number
}

export function GridTransactions({ data, itemsPerPage }: Props) {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedMonth, setSelectedMonth] = useState('')
  const [selectedTransactions, setSelectedTransactions] = useState<
    Transaction[]
  >([])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const filteredData = selectedMonth
    ? data.filter((item) => item.month === parseInt(selectedMonth))
    : data
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)

  const extractDataMonths = Array.from(new Set(data.map((item) => item.month)))

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

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value)
    setCurrentPage(1)
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

  // const handleDelete = (transaction: Transaction) => {
  //   const countTransactions = data.filter(
  //     (item) => item.uuid === transaction.uuid,
  //   ).length

  // }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="mt-8 flex items-center space-x-3 pb-3">
          <span>Filtrar:</span>
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="rounded-md bg-slate-800 p-1.5"
          >
            <option value="">Todos</option>
            {extractDataMonths.map((month) => (
              <option key={month} value={month.toString()}>
                {monthToString(month)}
              </option>
            ))}
          </select>
        </div>
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
              <tr key={row.id}>
                <td>{row.description}</td>
                <td>{currencyBRL(row.amount)}</td>
                <td>{monthToString(row.month)}</td>
                <td>{row.year}</td>
                <td>{translateStatusBRL(row.status)}</td>
                <td>{row.category.description}</td>
                <td className="flex items-center justify-evenly">
                  <Trash2
                    size={20}
                    className="cursor-pointer text-red-500 active:scale-95"
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
