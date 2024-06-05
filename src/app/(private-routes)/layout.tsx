import { Navbar } from '@/components/navbar'

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar />
      <main className="p-2.5 font-light text-slate-100 md:p-5">{children}</main>
    </>
  )
}
