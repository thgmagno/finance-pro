import { actions } from '@/actions'
import { Dashboard } from '@/components/dashboard'
import { useSession } from '@/hooks/useSession'

export default async function Home() {
  const { id } = await useSession()

  const data = await actions.transaction.findMany(parseInt(id))

  return (
    <>
      <h1 className="title">Finance Pro</h1>
      <Dashboard data={data} />
    </>
  )
}
