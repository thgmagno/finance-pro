import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import './globals.css'

const lato = Lato({ subsets: ['latin'], weight: ['300', '400', '700'] })

export const metadata: Metadata = {
  title: 'FinancePro',
  description: 'Personal finance control app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={lato.className}>{children}</body>
    </html>
  )
}
