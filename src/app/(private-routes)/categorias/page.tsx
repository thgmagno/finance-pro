import { actions } from '@/actions'
import { AppPage } from '@/components/ui/app-page'
import { Button } from '@/components/ui/button'

export default async function Categorias() {
  const [expenseCategories, incomeCategories] = await Promise.all([
    actions.categories.getCategories('EXPENSE'),
    actions.categories.getCategories('INCOME'),
  ])

  return (
    <AppPage title="Categorias" actions={<Button>Incluir categoria</Button>}>
      Categorias
      <pre>{JSON.stringify(expenseCategories, null, 2)}</pre>
      <pre>{JSON.stringify(incomeCategories, null, 2)}</pre>
    </AppPage>
  )
}
