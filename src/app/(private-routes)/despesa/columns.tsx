'use client'

import { Transaction } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'description',
    header: 'Descrição',
  },
  {
    accessorKey: 'category.description',
    header: 'Categoria',
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
    cell: ({ row }) => {
      const amount = row.original.amount
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(amount)
    },
  },
]
