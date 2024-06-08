'use client'

import { actions } from '@/actions'
import { Transaction } from '@/lib/types'
import { currencyBRL } from '@/utils/currencyBRL'
import { monthToString } from '@/utils/monthToString'
import { Edit, X } from 'lucide-react'
import React, { useState } from 'react'
import { ButtonFormSubmit } from '../button/FormSubmit'
import { InputCurrencyBRL } from '../input/Currency'
import { useFormState } from 'react-dom'
import { translateStatusBRL } from '@/utils/translateStatusBRL'

interface Props {
  transaction: Transaction
}

export function UpdateBox({ transaction }: Props) {
  const [formState, action] = useFormState(actions.transaction.update, {
    success: false,
    errors: {},
  })

  const [open, setOpen] = useState(false)

  return (
    <>
      <Edit
        size={20}
        onClick={() => setOpen(true)}
        className="cursor-pointer text-green-500 active:scale-95"
      />

      {/* Dialog box */}
      {open && (
        <div className="fixed left-0 top-0 z-50 min-h-screen w-full bg-neutral-900/95">
          <div className="mx-auto flex max-w-lg flex-col items-center justify-center px-5 py-12">
            <div className="flex flex-col rounded-lg border border-zinc-400 bg-neutral-800/60 p-3.5">
              <X
                onClick={() => setOpen(false)}
                className="cursor-pointer self-end"
              />
              <form action={action} className="mt-3 flex flex-col gap-3">
                <h1 className="text-slate-200">Editar o valor do lançamento</h1>

                <div className="flex flex-col">
                  <span className="truncate">{transaction.description}</span>
                  <span>
                    {monthToString(transaction.month)}/
                    {transaction.year.toString().slice(2)}
                  </span>
                  <span>{currencyBRL(transaction.amount)}</span>
                  <span>{translateStatusBRL(transaction.status)}</span>
                </div>

                {/* <p className="text-slate-200">
                  {transaction.description} - {monthToString(transaction.month)}
                  /{transaction.year} - <b>{currencyBRL(transaction.amount)}</b>
                </p> */}

                <input
                  type="hidden"
                  name="transactionId"
                  value={transaction.id}
                />

                <InputCurrencyBRL
                  name="amount"
                  isInvalid={false}
                  errorMessage={['']}
                  defaultValue={transaction.amount}
                  textDark
                  noLabel
                />

                {formState?.success && (
                  <p className="text-sm text-green-500">
                    Valor atualizado com sucesso
                  </p>
                )}

                <ButtonFormSubmit title="Salvar alterações" />
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
