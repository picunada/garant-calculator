import type { ChangeEvent, Dispatch, Ref, SetStateAction } from 'react'
import { useEffect, useRef, useState } from 'react'
import { RussianRuble } from 'lucide-react'
import { Input } from '../ui/input'

const f = Intl.NumberFormat(
  'ru-ru',
)

interface SumInputProps {
  setter: Dispatch<SetStateAction<string>>
  value: string
}

const SumInput: React.FC<SumInputProps> = ({
  setter,
  value
}) => {

  const sumRef = useRef<HTMLInputElement>()

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const format = async () => {
      let sum = e.target.value
      sum = sum.replace('руб', '')
      sum = sum.replace(/\s+/g, '')
      // sum = sum.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
      sum = sum.replace(/\s+/g, '')

      const sumFloat = parseFloat(sum)

      if (isNaN(sumFloat)) {
        setter(f.format(0))
        return
      }

      if (sumFloat > 1500000000)
        return

      setter(f.format(sumFloat))
    }

    format()
  }

  return (
    <div className='relative flex w-full'>
      <Input ref={sumRef as Ref<HTMLInputElement>} onChange={onInputChange} value={value} className='appearance-none m-0 pl-[3.25rem]' placeholder='Укажите сумму' />
      <RussianRuble className='absolute top-2 left-4 w-5 text-neutral-400 ' />
    </div>
  )
}

export default SumInput
