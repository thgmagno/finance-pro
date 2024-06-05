'use client'

import { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'

export default function Dashboard() {
  const [data, setData] = useState([])

  useEffect(() => {
    // Carregar dados das receitas e despesas
  }, [])

  const chartData = {
    labels: ['Receitas', 'Despesas'],
    datasets: [
      {
        label: 'Valor',
        data: [],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  }

  return (
    <div>
      <Bar data={chartData} />
    </div>
  )
}
