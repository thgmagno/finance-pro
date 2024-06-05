import { actions } from '@/actions'
import { NewTransactionFormBtn } from '@/components/form/NewTransactionFormBtn'

export default async function Expense() {
  const [transactions, categories] = await Promise.all([
    actions.transaction.findMany(),
    actions.category.findMany(),
  ])

  return (
    <>
      <NewTransactionFormBtn categories={categories} />
      <h1>Despesa</h1>
    </>
  )
}
