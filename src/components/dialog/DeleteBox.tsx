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
        <div className="fixed left-0 top-0 z-50 min-h-screen w-full bg-neutral-900/95">
          <div className="mx-auto flex max-w-lg flex-col items-center justify-center px-5 py-12">
            <div className="flex flex-col rounded-lg border border-zinc-400 bg-neutral-800/60 p-3.5">
              <X
                onClick={() => setOpen(false)}
                className="cursor-pointer self-end"
              />
              {data.length > 1 ? (
                <>
                  <div className="my-2.5 flex flex-col space-y-2">
                    <span>Existem outros lançamentos vinculados a este:</span>
                    <ul>
                      {data
                        .map((item) => (
                          <li
                            key={item.id}
                            className={`${transaction.id === item.id ? 'text-green-500 underline' : ''}`}
                          >
                            {item.description} - {monthToString(item.month)}/
                            {item.year} - <b>{currencyBRL(item.amount)}</b>
                          </li>
                        ))
                        .reverse()}
                    </ul>
                    <span className="font-medium">O que deseja fazer?</span>
                  </div>

                  <button
                    onClick={() => deleteUnique(transaction)}
                    className="my-2 rounded-md border border-zinc-400 px-2.5 py-1.5 text-green-500 underline"
                  >
                    Apagar somente este lançamento
                  </button>
                  <button
                    onClick={() => deleteMany(data)}
                    className="rounded-md border border-zinc-400 px-2.5 py-1.5 text-red-500"
                  >
                    Apagar todos
                  </button>
                </>
              ) : (
                <>
                  <h1 className="my-3 mb-5">Excluir lançamento?</h1>
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
