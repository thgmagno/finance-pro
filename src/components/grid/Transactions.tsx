'use client'

import { Transaction } from '@/lib/types'
import { currencyBRL } from '@/utils/currencyBRL'
import { monthToString } from '@/utils/monthToString'
import { Square } from 'lucide-react'
import { useState } from 'react'
import { DeleteBox } from '../dialog/DeleteBox'
import { getStatusColor } from '@/utils/getStatusColor'
import { SelectStatus } from '../select/Status'
import { GridFilters, initialState } from './Filters'
import { normalizeString } from '@/utils/normalizeString'
import { UpdateBox } from '../dialog/UpdateBox'

interface Props {
  data: Transaction[]
}

export function GridTransactions({ data }: Props) {
  const [filters, setFilters] = useState(initialState)
  const [itemsPerPage, setItemsPerPage] = useState(10)
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
    const matchesStatus = filters.status ? item.status === filters.status : true
    const matchesSearchTerm = filters.searchTerm
      ? normalizeString(item.description).includes(
          normalizeString(filters.searchTerm),
        ) ||
        normalizeString(item.category.description).includes(
          normalizeString(filters.searchTerm),
        )
      : true
    return matchesMonth && matchesYear && matchesStatus && matchesSearchTerm
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
      <div className="my-3 flex flex-col justify-between md:flex-row md:items-center">
        <GridFilters
          data={data}
          filters={filters}
          setFilters={setFilters}
          setCurrentPage={setCurrentPage}
        />

        {/* Total */}
        <div className="mt-4 flex justify-end md:mt-0">
          <span>
            Total: <b>{currencyBRL(totalAmount)}</b>
          </span>
        </div>
      </div>

      <div className="no-scrollbar flex flex-col overflow-scroll rounded bg-slate-800">
        <table className="w-full border-b-2">
          <thead>
            <tr>
              <th className="min-w-40">Descrição</th>
              <th className="min-w-40">Valor</th>
              <th className="min-w-20">Mês</th>
              <th className="min-w-20">Ano</th>
              <th className="min-w-40">Status</th>
              <th className="min-w-40">Categoria</th>
              <th className="min-w-40">Ações</th>
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
                  <UpdateBox transaction={row} />
                  <Square
                    onClick={() => handleSelectTransaction(row)}
                    size={20}
                    className={`cursor-pointer ${
                      selectedTransactions.find((t) => t.id === row.id)
                        ? 'rounded bg-green-500 text-slate-900'
                        : ''
                    }`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!totalPages && (
        <span className="flex items-center justify-center rounded-b-md bg-slate-800 py-8 text-sm text-zinc-400 md:text-base">
          Nada foi encontrado. Verifique os critérios de busca.
        </span>
      )}
      <div className="mb-20 grid grid-cols-2 items-baseline justify-center gap-2 py-2 md:flex md:flex-row md:justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm">Mostrar</span>
          <select
            defaultValue={itemsPerPage}
            onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
            className="bg-transparent"
          >
            <option value={10} className="bg-slate-700">
              10
            </option>
            <option value={25} className="bg-slate-700">
              25
            </option>
            <option value={50} className="bg-slate-700">
              50
            </option>
            <option value={100} className="bg-slate-700">
              100
            </option>
          </select>
          <span className="text-sm">por página</span>
        </div>
        <span className="ml-auto text-sm md:m-0">
          Página {currentPage} de {totalPages}
        </span>
        <div className="col-span-2 flex justify-center space-x-3">
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
        <div className="fixed bottom-3 right-3 rounded-md border-2 border-slate-400 bg-green-600 px-2.5 py-1.5 font-medium shadow-md md:bottom-5 md:right-5">
          Total: {currencyBRL(sumSelectedTransactions)}
        </div>
      )}
    </>
  )
}
