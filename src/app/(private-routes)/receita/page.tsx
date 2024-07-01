import { actions } from '@/actions'
import { NewTransactionFormBtn } from '@/components/form/NewTransactionFormBtn'
import { GridEmpty } from '@/components/grid/Empty'
import { GridFilters } from '@/components/grid/Filters'
import { GridTransactions } from '@/components/grid/Transactions'
import { useSession } from '@/hooks/useSession'
import { currencyBRL } from '@/utils/currencyBRL'

export default async function Income({
  searchParams,
}: {
  searchParams: { mes: string; ano: string }
}) {
  const { id } = await useSession()

  const response = await actions.transaction.findTransactions(
    parseInt(id),
    searchParams.mes,
    searchParams.ano,
  )

  const extractIncomes = response?.data.filter((item) => item.type === 'INCOME')

  const extractCategoryIncomes = response?.metadata.categories.filter(
    (item) => item.type === 'INCOME',
  )

  const totalAmount = extractIncomes.reduce((acc, item) => acc + item.amount, 0)

  return (
    <>
      <NewTransactionFormBtn userId={id} categories={extractCategoryIncomes} />
      <h1 className="title mb-5">Receita</h1>
      <GridFilters
        months={response.metadata.months}
        years={response.metadata.years}
        categories={extractCategoryIncomes}
      />
      <div className="my-3 flex justify-end md:mt-0">
        <span>
          Total: <b>{currencyBRL(totalAmount)}</b>
        </span>
      </div>
      {extractIncomes.length > 0 ? (
        <GridTransactions data={extractIncomes} />
      ) : (
        <GridEmpty />
      )}
    </>
  )
}
