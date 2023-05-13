import type { ChangeEvent, Dispatch, Ref, SetStateAction } from 'react'
import { useEffect, useRef, useState } from 'react'
import { RussianRuble } from 'lucide-react'
import { Input } from '../ui/input'

const f = Intl.NumberFormat(
  'ru-ru',
)

interface SumInputProps {
  setter: Dispatch<SetStateAction<string>>
}

const SumInput: React.FC<SumInputProps> = ({
  setter,
}) => {
  const [sum, setSum] = useState('')

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
        setSum(f.format(0))
        return
      }

      if (sumFloat > 1500000000)
        return

      setSum(f.format(sumFloat))
    }

    format()
  }

  useEffect(() => setter(sum), [sum])

  return (
    <div className='relative flex w-full'>
      <Input ref={sumRef as Ref<HTMLInputElement>} onChange={onInputChange} value={sum} className='appearance-none m-0 pl-7' placeholder='Укажите сумму' />
      <RussianRuble className='absolute top-2 left-1 w-5 text-neutral-400 ' />
    </div>
  )
}

export default SumInput
