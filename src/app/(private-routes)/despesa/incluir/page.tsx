import { actions } from '@/actions'
import { TransactionForm } from '@/components/forms/transaction/TransactionForm'

export default async function ExpenseCreatePage() {
  const { categories } = await actions.categories.getCategories('EXPENSE')
  const categoriesList =
    categories && categories?.length > 0
      ? categories?.map((category) => ({
          value: `${category.description}__id__${category.id}`,
          label: category.description,
        }))
      : []

  return <TransactionForm type="EXPENSE" categories={categoriesList} />
}
