import type { Metadata } from 'next'
import './globals.css'
import { cn } from '@/lib/utils'
import { poppins } from './fonts'


export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased",poppins.variable)}>
          {children}
      </body>
    </html>
  )
}
