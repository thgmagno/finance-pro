import { actions } from '@/actions'
import { redirect } from 'next/navigation'

export default async function GroupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await actions.session.get()

  if (session?.visitor) return redirect('/')

  return <div>{children}</div>
}
