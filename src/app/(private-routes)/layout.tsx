import { actions } from '@/actions'
import { Balance } from '@/components/Balance'
import { Greeting } from '@/components/Greeting'
import { AppSidebar } from '@/components/sidebar/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { VisitorBanner } from '@/components/VisitorBanner'
import { redirect } from 'next/navigation'

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await actions.session.get()
  if (!session) return redirect('/entrar')

  const balance = await actions.group.getBalance()

  return (
    <SidebarProvider>
      <AppSidebar balance={balance} isVisitor={session?.visitor} />
      <main className="flex min-h-svh w-full flex-col">
        <div className="flex items-center justify-between gap-2 overflow-hidden">
          <SidebarTrigger />
          {session?.name && <Greeting name={session?.name} />}
          {session?.groupId && <Balance balance={balance} />}
        </div>
        <div className="flex flex-1 flex-col px-4 pb-20 pt-2 md:px-6">
          {session?.visitor && <VisitorBanner />}
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}
