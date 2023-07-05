'use client'

import * as React from 'react'
import { Calendar as CalendarIcon } from 'lucide-react'

import { ru } from 'date-fns/locale'
import type { SelectSingleEventHandler } from 'react-day-picker'
import { Input } from '../ui/input'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface CalculatorDatePickerProps {
  setter: React.Dispatch<React.SetStateAction<string>>
  value: string
}

const CalculatorDatePicker: React.FC<CalculatorDatePickerProps> = ({
  setter,
  value
}) => {
  const [date, setDate] = React.useState<Date>(new Date())
  const inputRef = React.useRef<HTMLInputElement>()

  const setDateAndPeriod: SelectSingleEventHandler = (day, selected) => {
    setDate(selected)
    const days = (selected.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    const val = `${Math.ceil(days)}`
    const func = async () => {
      if (val === '0')
        setter('')
      const lastDigit = parseInt(val ?? '0') % 10
      if (lastDigit === 1)
        setter(`${val} день`)
      else if (lastDigit > 1 && lastDigit < 5 && (parseInt(val!) > 20 || parseInt(val!) < 5))
        setter(`${val} дня`)
      else setter(`${val} дней`)
    }
    func()
  }

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const start = e.target.selectionStart
    const end = e.target.selectionEnd
    let val = e.target.value
    val = val.replace(/\D/g, '')
    const func = async () => {
      if (val.length === 0)
        setter('')

      const lastDigit = parseInt(val ?? '0') % 10

      if (lastDigit === 1)
        setter(`${val} день`)
      else if (lastDigit > 1 && lastDigit < 5 && (parseInt(val!) > 20 || parseInt(val!) < 5))
        setter(`${val} дня`)
      else setter(`${val} дней`)
    }
    func().then(() => e.target.setSelectionRange(start, end))
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          <Input ref={inputRef as React.Ref<HTMLInputElement>} type='text' value={value} onChange={onInputChange}
            tabIndex={-1} onClick={e => e.stopPropagation()}
            className='border-none focus-visible:ring-transparent
             focus-visible:ring-offset-0 focus-visible:outline-transparent
             focus-visible:border-none'
            placeholder='Укажите срок' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          locale={ru}
          selected={date}
          onSelect={setDateAndPeriod}
          fromDate={new Date()}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default CalculatorDatePicker
