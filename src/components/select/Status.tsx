'use client'

import { actions } from '@/actions'
import { StatusTransaction, Transaction } from '@/lib/types'
import { toast } from 'sonner'

interface Props {
  transaction: Transaction
}

export function SelectStatus({ transaction }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    toast.promise(
      actions.transaction.changeStatus(
        transaction.id,
        e.target.value as StatusTransaction,
      ),
      {
        success: 'Status alterado',
        loading: 'Processando informação',
        error: 'Não foi executar a alteração, tente novamente',
      },
    )
  }

  return (
    <select
      onChange={handleChange}
      defaultValue={transaction.status}
      className="bg-transparent"
    >
      <option value="OK" className="bg-slate-700 text-slate-100">
        Baixado
      </option>
      <option value="PENDING" className="bg-slate-700 text-slate-100">
        Pendente
      </option>
      <option value="OVERDUE" className="bg-slate-700 text-slate-100">
        Atrasado
      </option>
    </select>
  )
}
