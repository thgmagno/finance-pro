'use client'

import { Transaction } from '@/lib/types'
import { currencyBRL } from '@/utils/currencyBRL'
import { monthToString } from '@/utils/monthToString'
import { SelectStatus } from '../select/Status'
import { getStatusColor } from '@/utils/getStatusColor'
import { DeleteBox } from '../dialog/DeleteBox'
import { UpdateBox } from '../dialog/UpdateBox'
import { SumTransactions } from './SumTransactions'
import { useState } from 'react'
import { useFormState } from 'react-dom'
import { actions } from '@/actions'
import { toast } from 'sonner'

interface Props {
  data: Transaction[]
}

export function GridTransactions({ data }: Props) {
  const [totalSum, setTotalSum] = useState(0)
  const [modal, setModal] = useState(false)
  const [dataList, setDataList] = useState<number[]>([])
  const [resetKey, setResetKey] = useState(0)

  function handleSum(transaction: Transaction, selected: boolean) {
    if (selected) {
      setTotalSum((prevState) => (prevState += transaction.amount))
      setDataList((prevState) => [...prevState, transaction.id])
    } else {
      setTotalSum((prevState) => (prevState -= transaction.amount))
      setDataList((prevState) =>
        prevState.filter((id) => id !== transaction.id),
      )
    }
  }

  const [formState] = useFormState(actions.transaction.updateMany, {
    success: false,
    errors: {},
  })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    if (!formData.get('newStatus')) {
      toast.error('Selecione o status para fazer a alteração')
    } else {
      toast.promise(
        actions.transaction.updateMany(formState, formData).then(() => {
          setTotalSum(0)
          setModal(false)
          setDataList([])
          setResetKey((prevKey) => prevKey + 1)
        }),
        {
          loading: 'Processando informações',
          success: 'Alterações realizadas com sucesso',
          error: 'Não foi possível concluir, tente novamente',
        },
      )
    }
  }

  return (
    <div className="no-scrollbar mb-40 flex flex-col overflow-scroll rounded bg-slate-800">
      <table className="w-full border-b-2">
        <thead>
          <tr>
            <th className="max-w-40">Descrição</th>
            <th className="min-w-28">Valor</th>
            <th className="min-w-28">Mês</th>
            <th className="min-w-28">Ano</th>
            <th className="min-w-28">Status</th>
            <th className="min-w-40">Categoria</th>
            <th className="min-w-40">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((dt) => (
            <tr key={dt.id} className={`${getStatusColor(dt.status)}`}>
              <td className="truncate">{dt.description}</td>
              <td className="truncate">{currencyBRL(dt.amount)}</td>
              <td className="truncate">{monthToString(dt.month)}</td>
              <td className="truncate">{dt.year}</td>
              <td className="truncate">
                <SelectStatus transaction={dt} />
              </td>
              <td className="truncate">{dt.category.description}</td>
              <td className="flex items-center justify-evenly">
                <UpdateBox transaction={dt} />
                <SumTransactions
                  key={`${dt.id}-${resetKey}`}
                  transaction={dt}
                  handleSum={handleSum}
                />
                <DeleteBox
                  transaction={dt}
                  data={data.filter((item) => item.uuid === dt.uuid)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Renderiza a soma e o botão de alterar status */}
      {totalSum > 0 && (
        <div className="fixed bottom-3 right-3 flex items-center space-x-3 rounded-md border-2 border-slate-700 bg-slate-900/75 px-3 py-2 shadow backdrop-blur">
          <span className="text-lg font-medium">
            {totalSum.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
          <button
            onClick={() => setModal(true)}
            className="rounded-md bg-slate-300 px-2 py-0.5 font-medium text-slate-800 transition duration-200 active:scale-95"
          >
            Alterar
          </button>
        </div>
      )}

      {/* Renderiza o modal */}
      {totalSum > 0 && modal && (
        <div className="fixed bottom-16 right-3 flex min-w-[196px] flex-col rounded-md border border-slate-600 bg-slate-900/70 p-2 backdrop-blur">
          <form onSubmit={onSubmit} className="flex flex-col space-y-2">
            <input type="hidden" name="dataList" value={String(dataList)} />
            <select
              name="newStatus"
              className="w-full rounded-md border border-slate-600 bg-transparent p-1 outline-none"
            >
              <option value="" className="bg-slate-700 text-slate-100">
                Alterar status
              </option>
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
            <footer className="flex items-center justify-between gap-2 text-sm">
              <button
                onClick={() => setModal(false)}
                type="button"
                className="w-full rounded-md bg-slate-300 px-1.5 py-1 font-medium text-slate-800 transition duration-200 active:scale-95"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="w-full rounded-md bg-emerald-900 px-1.5 py-1 font-medium text-emerald-400 transition duration-200 active:scale-95"
              >
                Confirmar
              </button>
            </footer>
          </form>
        </div>
      )}
    </div>
  )
}
