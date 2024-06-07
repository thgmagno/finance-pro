import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Providers from './providers'

const montserrat = Montserrat({ subsets: ['latin'] })

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
      <body className={montserrat.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
