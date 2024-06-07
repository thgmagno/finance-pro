'use client'

import { actions } from '@/actions'
import { Transaction } from '@/lib/types'
import { currencyBRL } from '@/utils/currencyBRL'
import { monthToString } from '@/utils/monthToString'
import { Trash2, X } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'

interface Props {
  transaction: Transaction
  data: Transaction[]
}

export function DeleteBox({ transaction, data }: Props) {
  const [open, setOpen] = useState(false)

  const deleteMany = (transactions: Transaction[]) => {
    toast.promise(
      actions.transaction.deleteMany(transactions).then(() => setOpen(false)),
      {
        success: 'Transações excluídas com sucesso',
        loading: 'Processando informações',
        error: 'Não foi possível concluir. Tente novamente',
      },
    )
  }

  const deleteUnique = (transaction: Transaction) => {
    toast.promise(
      actions.transaction.deleteUnique(transaction).then(() => setOpen(false)),
      {
        success: 'Transação excluída com sucesso',
        loading: 'Processando informação',
        error: 'Não foi possível concluir. Tente novamente',
      },
    )
  }

  return (
    <>
      <Trash2
        size={20}
        onClick={() => setOpen(true)}
        className="cursor-pointer text-red-500 active:scale-95"
      />
      {open && (
        <div className="absolute left-0 top-0 z-50 min-h-screen w-full flex-1 bg-neutral-900/95">
          <div className="mx-auto flex max-w-lg flex-col items-center justify-center px-5 py-12">
            <div className="flex flex-col rounded-lg border border-zinc-400 bg-neutral-800/60 p-2.5">
              <X
                onClick={() => setOpen(false)}
                className="cursor-pointer self-end"
              />
              {data.length > 1 ? (
                <>
                  <h1 className="mb-5 text-red-500">
                    Existem outros lançamentos vinculados a este
                  </h1>
                  <ul>
                    {data.map((item) => (
                      <li
                        key={item.id}
                        className={`${transaction.id === item.id ? 'text-green-500' : ''}`}
                      >
                        {item.description} - {monthToString(item.month)}/
                        {item.year} - <b>{currencyBRL(item.amount)}</b>
                      </li>
                    ))}
                  </ul>
                  <h2>O que deseja fazer?</h2>
                  <button
                    onClick={() => deleteMany(data)}
                    className="mt-5 rounded-md border border-zinc-400 px-2.5 py-1.5"
                  >
                    Apagar todos
                  </button>
                  <button
                    onClick={() => deleteUnique(transaction)}
                    className="rounded-md border border-zinc-400 px-2.5 py-1.5"
                  >
                    Apagar somente este lançamento
                  </button>
                </>
              ) : (
                <>
                  <h1 className="mb-5 text-red-500">Excluir lançamento?</h1>
                  <p>
                    {transaction.description} -{' '}
                    {monthToString(transaction.month)}/{transaction.year} -{' '}
                    <b>{currencyBRL(transaction.amount)}</b>
                  </p>
                  <button
                    onClick={() => deleteUnique(transaction)}
                    className="mt-5 rounded-md border border-zinc-400 px-2.5 py-1.5"
                  >
                    Confirmar
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
