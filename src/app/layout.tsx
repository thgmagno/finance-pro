import type { Metadata } from 'next'
import { Bai_Jamjuree as BaiJamjuree } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const baiJamjuree = BaiJamjuree({
  subsets: ['latin'],
  weight: ['400', '700'],
})

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
      <body className={baiJamjuree.className} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
