import { actions } from '@/actions'
import { NewTransactionFormBtn } from '@/components/form/NewTransactionFormBtn'
import { GridEmpty } from '@/components/grid/Empty'
import { GridTransactions } from '@/components/grid/Transactions'
import { useSession } from '@/hooks/useSession'

export default async function Expense() {
  const { id } = await useSession()

  const [transactions, categories] = await Promise.all([
    actions.transaction.findMany(parseInt(id)),
    actions.category.findMany(parseInt(id)),
  ])

  const filtered = transactions?.filter((item) => item.type === 'EXPENSE')

  return (
    <>
      <NewTransactionFormBtn userId={id} categories={categories} />
      <h1 className="title">Despesa</h1>
      {filtered.length > 0 ? (
        <GridTransactions data={filtered} itemsPerPage={10} />
      ) : (
        <GridEmpty />
      )}
    </>
  )
}
