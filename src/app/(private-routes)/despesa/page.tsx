import { actions } from '@/actions'
import { NewTransactionFormBtn } from '@/components/form/NewTransactionFormBtn'
import { GridEmpty } from '@/components/grid/Empty'
import { GridFilters } from '@/components/grid/Filters'
import { GridTransactions } from '@/components/grid/Transactions'
import { useSession } from '@/hooks/useSession'
import { currencyBRL } from '@/utils/currencyBRL'

export default async function Expense({
  searchParams,
}: {
  searchParams: { mes: string; ano: string; categoria: string }
}) {
  const { id } = await useSession()

  const [response, categories] = await Promise.all([
    actions.transaction.findTransactions(
      parseInt(id),
      searchParams.mes,
      searchParams.ano,
    ),
    actions.category.findMany(parseInt(id)),
  ])

  const extractExpenses = response?.data.filter(
    (item) => item.type === 'EXPENSE',
  )

  const filtered = searchParams.categoria
    ? extractExpenses.filter(
        (item) => item.category.description === searchParams.categoria,
      )
    : extractExpenses

  const totalAmount = filtered.reduce((acc, item) => acc + item.amount, 0)

  return (
    <>
      <NewTransactionFormBtn userId={id} categories={categories} />
      <h1 className="title">Despesa</h1>
      <GridFilters
        months={response.metadata.months}
        years={response.metadata.years}
        categories={response.metadata.categories}
      />
      <div className="my-3 flex justify-end md:mt-0">
        <span>
          Total: <b>{currencyBRL(totalAmount)}</b>
        </span>
      </div>
      {filtered.length > 0 ? (
        <GridTransactions data={filtered} />
      ) : (
        <GridEmpty />
      )}
    </>
  )
}
