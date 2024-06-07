import { Toaster } from 'sonner'

export default async function Providers({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
}
