import { Navbar } from '@/components/navbar'
import { useSession } from '@/hooks/useSession'
import { redirect } from 'next/navigation'

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { id, username } = await useSession()

  if (!id || !username) redirect('/entrar')

  return (
    <>
      <Navbar />
      <main className="p-2.5 font-light text-slate-100 md:p-5">{children}</main>
    </>
  )
}
