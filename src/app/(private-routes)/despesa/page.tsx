import { actions } from '@/actions'
import { NewTransactionFormBtn } from '@/components/form/NewTransactionFormBtn'
import { useSession } from '@/hooks/useSession'

export default async function Expense() {
  const { id } = await useSession()

  const [transactions, categories] = await Promise.all([
    actions.transaction.findMany(),
    actions.category.findMany(parseInt(id)),
  ])

  const filtered = transactions?.filter((item) => item.type === 'EXPENSE')

  return (
    <>
      <NewTransactionFormBtn userId={id} categories={categories} />
      <h1>Despesa</h1>
      {filtered && <pre>{JSON.stringify(filtered, null, 2)}</pre>}
    </>
  )
}
