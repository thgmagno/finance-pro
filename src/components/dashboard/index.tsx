'use client'

import { Transaction } from '@/lib/types'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  LineElement,
  PointElement,
  Legend,
  Title,
} from 'chart.js'

ChartJS.register(
  LinearScale,
  CategoryScale,
  LineElement,
  PointElement,
  Legend,
  Title,
)

export function Dashboard({ data }: { data: Transaction[] }) {
  const despesasTotal = data
    .filter((dt) => dt.type === 'EXPENSE')
    .reduce((total, current) => total + current.amount, 0)

  const receitasTotal = data
    .filter((dt) => dt.type === 'INCOME')
    .reduce((total, current) => total + current.amount, 0)

  const chartData = {
    labels: ['Receitas', 'Despesas'],
    datasets: [
      {
        label: 'Valor',
        data: [receitasTotal, despesasTotal],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  }

  return (
    <div className="px-10">
      <Line data={chartData} />
    </div>
  )
}
