import { Footer, Navbar } from '@/components'
import './globals.css'

export const metadata = {
  title: 'YOuizane Car',
  description: 'Created by OUIZANE Younesse',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className ="relative"
      >
        <Navbar/>
        {children}
        <Footer/>
        </body>
    </html>
  )
}
