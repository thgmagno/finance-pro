import { actions } from '@/actions'
import { AppPage } from '@/components/ui/app-page'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export default async function GroupsPage() {
  const session = await actions.session.get()
  const alreadyHasGroup = session?.groupId

  return (
    <AppPage
      title="Grupos"
      description={
        alreadyHasGroup
          ? 'Acesse e gerencie os detalhes do seu grupo'
          : 'Descubra grupos ou crie um grupo personalizado para você'
      }
      actions={
        alreadyHasGroup ? null : (
          <Link href="/grupo/criar" className={buttonVariants()}>
            Criar grupo
          </Link>
        )
      }
    >
      {alreadyHasGroup ? <MyGroup /> : <SearchGroupForm />}
    </AppPage>
  )
}

function SearchGroupForm() {
  return <div>SearchGroupForm</div>
}

function MyGroup() {
  return <div>MyGroup</div>
}
