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
  searchParams: { mes: string; ano: string; categoria: string; status: string }
}) {
  const { id } = await useSession()

  const response = await actions.transaction.findTransactions(
    parseInt(id),
    searchParams.mes,
    searchParams.ano,
  )

  const extractExpenses = response?.data.filter(
    (item) => item.type === 'EXPENSE',
  )

  const extractCategoryExpenses = response.metadata.categories.filter(
    (item) => item.type === 'EXPENSE',
  )

  const filteredExpenses = extractExpenses.filter((item) => {
    const matchesCategory = searchParams.categoria
      ? item.category.description === searchParams.categoria
      : true

    const matchesStatus =
      searchParams.status === 'pendentes'
        ? item.status === 'OVERDUE' || item.status === 'PENDING'
        : searchParams.status === 'baixados'
          ? item.status === 'OK'
          : true

    return matchesCategory && matchesStatus
  })

  const totalAmount = filteredExpenses.reduce(
    (acc, item) => acc + item.amount,
    0,
  )

  return (
    <>
      <NewTransactionFormBtn userId={id} categories={extractCategoryExpenses} />
      <h1 className="title">Despesa</h1>
      <GridFilters
        months={response.metadata.months}
        years={response.metadata.years}
        categories={extractCategoryExpenses}
      />
      <div className="my-3 flex justify-end md:mt-0">
        <span>
          Total: <b>{currencyBRL(totalAmount)}</b>
        </span>
      </div>
      {filteredExpenses.length > 0 ? (
        <GridTransactions data={filteredExpenses} />
      ) : (
        <GridEmpty />
      )}
    </>
  )
}
