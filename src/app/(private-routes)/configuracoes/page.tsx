import { actions } from '@/actions'
import { ConfigAccount } from '@/components/forms/group/ConfigAccount'
import { ConfigSystem } from '@/components/forms/group/ConfigSystem'
import { AppPage } from '@/components/ui/app-page'

export default async function Configuracoes() {
  const [session] = await Promise.all([actions.session.get()])

  return (
    <AppPage title="Configurações">
      <section className="flex flex-col gap-4">
        <ConfigSystem />
        {session && <ConfigAccount session={session} />}
      </section>
    </AppPage>
  )
}
