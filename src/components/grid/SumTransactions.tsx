'use client'

import { Transaction } from '@/lib/types'
import { Square, SquareCheckBig } from 'lucide-react'
import { useState } from 'react'

export function SumTransactions({
  transaction,
  handleSum,
}: {
  transaction: Transaction
  handleSum(transaction: Transaction, selected: boolean): void
}) {
  const [selected, setSelected] = useState(false)

  function handleClick() {
    const newSelected = !selected
    setSelected(newSelected)
    handleSum(transaction, newSelected)
  }

  return (
    <button onClick={handleClick} className="text-neutral-100">
      {selected ? <SquareCheckBig /> : <Square />}
    </button>
  )
}
