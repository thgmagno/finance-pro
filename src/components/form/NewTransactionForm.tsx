'use client'

import { actions } from '@/actions'
import { Category, TypeTransaction } from '@/lib/types'
import { useFormState } from 'react-dom'
import { ButtonFormSubmit } from '@/components/button/FormSubmit'
import { InputText } from '@/components/input/Text'
import { SelectCategory } from '@/components/select/Category'
import { SelectRecurrency } from '@/components/select/Recurrency'
import { InputCurrencyBRL } from '@/components/input/Currency'

interface Props {
  TypeTransaction: TypeTransaction
  recurrent: boolean
  setRecurrent: (value: boolean) => void
  categories: Category[]
  userId: string
}

export function NewTransactionForm({
  TypeTransaction,
  recurrent,
  setRecurrent,
  categories,
  userId,
}: Props) {
  const [formState, action] = useFormState(actions.transaction.create, {
    errors: {},
  })

  const options = categories.filter((item) => item.type === TypeTransaction)

  return (
    <form
      action={action}
      className="my-5 space-y-2.5 rounded-lg border bg-slate-200 p-2 text-slate-800"
    >
      {/* Metadados */}
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="type" value={TypeTransaction} />

      {/* Categoria */}
      <SelectCategory
        options={options}
        isInvalid={!!formState?.errors.category}
        errorMessage={formState?.errors.category}
      />

      {/* Descrição */}
      <InputText
        name="description"
        label="Descrição"
        isInvalid={!!formState?.errors.description}
        errorMessage={formState?.errors.description}
        responsive
        capitalize="auto"
      />

      {/* Valor */}
      <InputCurrencyBRL
        name="amount"
        isInvalid={!!formState?.errors.amount}
        errorMessage={formState?.errors.amount}
      />

      {/* Recorrente */}
      <SelectRecurrency recurrent={recurrent} setRecurrent={setRecurrent} />

      {/* Botão Salvar */}
      <ButtonFormSubmit title="Salvar" />
    </form>
  )
}
