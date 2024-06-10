'use client'

import { Transaction } from '@/lib/types'
import { currencyBRL } from '@/utils/currencyBRL'
import { monthsArray } from '@/utils/monthsArray'
import {
  ArrowLeftCircle,
  ArrowRightCircle,
  ExternalLink,
  RefreshCcw,
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type TotalsType = { [category: string]: number }
type PaidTotalsType = { [category: string]: number }

export function Details({ data }: { data: Transaction[] }) {
  const currentDate = new Date()
  const initialState = {
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
  }
  const [selectedDate, setSelectedDate] = useState(initialState)
  const [monthsPending, setMonthsPending] = useState<string[]>([])

  const filteredData = data.filter(
    (dt) =>
      dt.month === selectedDate.month &&
      dt.year === selectedDate.year &&
      dt.type === 'EXPENSE',
  )

  const totals = filteredData.reduce((acc: TotalsType, dt) => {
    const category = dt.category.description
    acc[category] = (acc[category] || 0) + dt.amount
    return acc
  }, {})

  const paidTotals = filteredData.reduce((acc: PaidTotalsType, dt) => {
    if (dt.status === 'OK') {
      const category = dt.category.description
      acc[category] = (acc[category] || 0) + dt.amount
    }
    return acc
  }, {})

  const totalExpenses = filteredData.reduce((total, dt) => total + dt.amount, 0)
  const sortedCategories = Object.keys(totals).sort(
    (a, b) => totals[b] - totals[a],
  )

  const prev = () => {
    setSelectedDate((prev) => ({
      month: prev.month === 0 ? 11 : prev.month - 1,
      year: prev.month === 0 ? prev.year - 1 : prev.year,
    }))
  }

  const next = () => {
    setSelectedDate((prev) => ({
      month: prev.month === 11 ? 0 : prev.month + 1,
      year: prev.month === 11 ? prev.year + 1 : prev.year,
    }))
  }

  const reset = () => setSelectedDate(initialState)
  const isCurrentDate =
    initialState.month === selectedDate.month &&
    initialState.year === selectedDate.year

  useEffect(() => {
    const pendingMonths = data.reduce((acc: string[], dt) => {
      const monthYear = `${monthsArray[dt.month]}/${dt.year}`
      const total = data
        .filter(
          (transaction) =>
            transaction.month === dt.month &&
            transaction.year === dt.year &&
            transaction.type === 'EXPENSE',
        )
        .reduce((sum, transaction) => sum + transaction.amount, 0)

      const paid = data
        .filter(
          (transaction) =>
            transaction.month === dt.month &&
            transaction.year === dt.year &&
            transaction.type === 'EXPENSE' &&
            transaction.status === 'OK',
        )
        .reduce((sum, transaction) => sum + transaction.amount, 0)

      if (paid < total && !acc.includes(monthYear)) {
        acc.push(monthYear)
      }

      return acc
    }, [])
    setMonthsPending(pendingMonths)
  }, [data])

  return (
    <div className="mb-5 rounded-lg bg-slate-200 p-2.5 shadow-md md:mx-auto md:max-h-[290px] md:max-w-[580px] md:p-6 lg:max-h-[360px] lg:max-w-[720px]">
      <section className="flex flex-col items-center justify-center text-zinc-500">
        <h1>Atenção, pendência(s) em:</h1>
        <span className="flex flex-wrap gap-1 text-sm">
          {monthsPending.map((month) => (
            <b
              className="cursor-pointer rounded-md border border-slate-400 px-1 hover:bg-slate-400 hover:text-slate-100"
              onClick={() =>
                setSelectedDate({
                  month: monthsArray.indexOf(month.split('/')[0]),
                  year: parseInt(month.split('/')[1]),
                })
              }
            >
              {month
                .slice(0, 3)
                .concat('/')
                .concat(month.split('/')[1].slice(2))}
            </b>
          ))}
        </span>
      </section>
      <div className="my-2.5 flex flex-col text-slate-900">
        <section className="my-1.5 flex justify-between border-b border-t border-slate-300 py-2">
          <ArrowLeftCircle
            onClick={prev}
            size={20}
            className="cursor-pointer opacity-70"
          />
          <span className="flex items-center">
            {monthsArray[selectedDate.month]}/{selectedDate.year}
            {!isCurrentDate && (
              <RefreshCcw
                onClick={reset}
                size={14}
                className="ml-2 cursor-pointer"
              />
            )}
          </span>
          <ArrowRightCircle
            onClick={next}
            size={20}
            className="cursor-pointer opacity-70"
          />
        </section>
        <div className="no-scrollbar h-56 max-h-60 overflow-scroll rounded pb-5">
          <table className="no-scrollbar overflow-x-scroll overflow-y-scroll border">
            <thead>
              <tr>
                <th className="min-w-44">Descrição</th>
                <th className="min-w-44">Montante total</th>
                <th className="min-w-44">Percentual total</th>
                <th className="min-w-44">Situação</th>
                <th className="min-w-44">Ação</th>
              </tr>
            </thead>
            <tbody>
              {sortedCategories.map((category) => (
                <tr key={category}>
                  <td>{category}</td>
                  <td>{currencyBRL(totals[category])}</td>
                  <td>
                    {((totals[category] / totalExpenses) * 100).toFixed(2)}%
                  </td>
                  <td>
                    {paidTotals[category] < totals[category] ? (
                      <span className="font-medium text-amber-600">
                        pendente
                      </span>
                    ) : (
                      <span className="text-green-600">liquidado</span>
                    )}
                  </td>
                  <td>
                    <Link
                      href={{
                        pathname: '/despesa',
                        query: {
                          mes: selectedDate.month,
                          ano: selectedDate.year,
                          categoria: category,
                        },
                      }}
                      className="flex items-center justify-center gap-1"
                    >
                      Visualizar <ExternalLink size={13} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
