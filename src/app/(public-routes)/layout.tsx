import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const token = cookies().get('finance-pro')

  if (token) redirect('/')

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-2.5 md:p-5">
      {children}
    </div>
  )
}
