'use client'

import { Transaction } from '@/lib/types'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  Legend,
  Title,
} from 'chart.js'
import { monthToString } from '@/utils/monthToString'

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  Legend,
  Title,
)

type AggregatedData = {
  [key: string]: {
    incomes: number
    expenses: number
  }
}

export function Dashboard({ data }: { data: Transaction[] }) {
  const aggregatedData = data.reduce((acc: AggregatedData, transaction) => {
    const { month, year, amount, type, status } = transaction
    // const key = `${monthToString(month).slice(0, 3)}/${year.toString().slice(2)}`
    const key = `${year}-${month}`

    if (!acc[key]) {
      acc[key] = { incomes: 0, expenses: 0 }
    }

    if (type === 'INCOME' && status === 'OK') {
      acc[key].incomes += amount
    } else if (type === 'EXPENSE') {
      acc[key].expenses += amount
    }

    return acc
  }, {})

  const labels = Object.keys(aggregatedData).sort((a, b) => {
    const partsA = a.split('-')
    const partsB = b.split('-')
    const dateA = new Date(parseInt(partsA[0]), parseInt(partsA[1]), 1)
    const dateB = new Date(parseInt(partsB[0]), parseInt(partsB[1]), 1)
    return dateA.getTime() - dateB.getTime()
  })

  const formatedLabels = labels.map((label) => {
    const parts = label.split('-')

    return `${monthToString(parseInt(parts[1])).slice(0, 3)}/${parts[0].slice(2)}`
  })

  const incomesData = labels.map((label) => aggregatedData[label].incomes)
  const expensesData = labels.map((label) => aggregatedData[label].expenses)

  const chartData = {
    labels: formatedLabels,
    datasets: [
      {
        label: 'Receitas',
        data: incomesData,
        backgroundColor: '#36A2EB',
      },
      {
        label: 'Despesas',
        data: expensesData,
        backgroundColor: '#FF6384',
      },
    ],
  }

  return (
    <div className="my-5 max-w-lg rounded-lg border border-slate-400 bg-zinc-300 p-5 shadow-md">
      <Bar data={chartData} />
    </div>
  )
}
