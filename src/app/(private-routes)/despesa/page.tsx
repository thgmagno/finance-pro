import { actions } from '@/actions'
import { NewTransactionFormBtn } from '@/components/form/NewTransactionFormBtn'

export default async function Expense() {
  const [transactions, categories] = await Promise.all([
    actions.transaction.findMany(),
    actions.category.findMany(),
  ])

  const filtered = transactions?.filter((item) => item.type === 'EXPENSE')

  return (
    <>
      <NewTransactionFormBtn categories={categories} />
      <h1>Despesa</h1>
      {filtered && <pre>{JSON.stringify(filtered, null, 2)}</pre>}
    </>
  )
}
