import { actions } from '@/actions'
import { Charts } from '@/components/charts'
import { Balance } from '@/components/wallet/Balance'
import { useSession } from '@/hooks/useSession'

export default async function Home() {
  const { id } = await useSession()

  const data = await actions.transaction.findMany(parseInt(id))

  return (
    <>
      <h1 className="title">Finance Pro</h1>
      <Balance data={data} />
      <Charts data={data} />
    </>
  )
}
