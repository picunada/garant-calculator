import { Montserrat } from 'next/font/google'
import type { ReactNode } from 'react'
import Navbar from '@/components/navbar/Navbar'

interface LayoutProps {
  children: ReactNode
}

const inter = Montserrat({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const Layout: React.FC<LayoutProps> = ({
  children,
}) => {
  return (
    <>
      <style jsx global>{`
        :root {
        --font-sans: ${inter.style.fontFamily};
        }
      }`}</style>
      <div className='h-screen flex flex-col items-center'>
        <div className='max-w-[1200px]'>
          <Navbar />
          <main className={`flex flex-1 flex-col justify-between p-10 ${inter.className}`}>
            {children}
          </main>
        </div>

      </div>

    </>
  )
}

export default Layout
