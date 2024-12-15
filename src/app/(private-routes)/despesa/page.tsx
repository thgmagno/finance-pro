import { actions } from '@/actions'
import { DataTable } from '@/components/data-table'
import { AppPage } from '@/components/ui/app-page'
import { buttonVariants } from '@/components/ui/button'
import { SearchParamsTransactions } from '@/lib/types'
import { $Enums } from '@prisma/client'
import Link from 'next/link'
import { columns } from './columns'

export default async function Expense({
  searchParams,
}: {
  searchParams: Promise<SearchParamsTransactions>
}) {
  const params = await searchParams

  const { data, error } = await actions.transaction.getAll({
    page: params.pagina,
    limit: params.limite,
    status: params.status as $Enums.StatusTransaction,
    from: params.de ? new Date(params.de) : undefined,
    to: params.ate ? new Date(params.ate) : undefined,
    greaterThan: params.maior_que,
    lessThan: params.menor_que,
    description: params.descricao,
    categoryId: params.categoria,
    type: params.tipo as $Enums.TypeTransaction,
  })

  if (error) {
    return <div>{error}</div>
  }

  return (
    <AppPage
      title="Despesa"
      description="Gerencie suas despesas"
      actions={
        <Link href="/despesa/incluir" className={buttonVariants()}>
          Incluir despesa
        </Link>
      }
    >
      <DataTable data={data?.transactions ?? []} columns={columns} />
    </AppPage>
  )
}
