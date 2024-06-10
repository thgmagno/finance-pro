import { Transaction } from '@/lib/types'
import { currencyBRL } from '@/utils/currencyBRL'

export function Balance({ data }: { data: Transaction[] }) {
  const totalExpenses = data
    .filter((dt) => dt.type === 'EXPENSE' && dt.status === 'OK')
    .reduce((acc, expense) => acc + expense.amount, 0)

  const totalIncomes = data
    .filter((dt) => dt.type === 'INCOME' && dt.status === 'OK')
    .reduce((acc, income) => acc + income.amount, 0)

  const balance = totalIncomes - totalExpenses

  return (
    <section>
      <h1 className="mt-3 px-5 text-end text-zinc-300">
        Saldo: {currencyBRL(balance)}
      </h1>
    </section>
  )
}
