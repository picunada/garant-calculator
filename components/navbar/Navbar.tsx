'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { MoonStar } from 'lucide-react'
import dynamic from 'next/dynamic'
import { Label } from '../ui/label'
import { Switch } from '../ui/switch'

function Navbar() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="flex flex-row-reverse ">
      <div className='flex flex-row gap-3 items-center p-4' style={!mounted ? { visibility: 'hidden' } : undefined}>
        <Switch defaultChecked={theme === 'dark'} onClick={() => theme === 'dark' ? setTheme('light') : setTheme('dark')} id="dark-mode" />
        <Label htmlFor="dark-mode">
          <MoonStar />
        </Label>
      </div>
    </header>
  )
}

export default dynamic(() => Promise.resolve(Navbar), {
  ssr: false,
})
