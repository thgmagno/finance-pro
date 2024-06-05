import { actions } from '@/actions'
import { NewTransactionFormBtn } from '@/components/form/NewTransactionFormBtn'

export default async function Income() {
  const [transactions, categories] = await Promise.all([
    actions.transaction.findMany(),
    actions.category.findMany(),
  ])

  return (
    <>
      <NewTransactionFormBtn categories={categories} />
      <h1>Receita</h1>
    </>
  )
}
