'use client'

import { Check, ChevronsUpDown } from 'lucide-react'

import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface LawProps {
  setter: Dispatch<SetStateAction<string>>
}

const laws = [
  {
    value: '44',
    label: '44-ФЗ',
  },
  {
    value: '223',
    label: '223-ФЗ',
  },
  {
    value: '615',
    label: 'ПП 615',
  },
]

export const LawCombobox: React.FC<LawProps> = ({
  setter,
}) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? laws.find(law => law.value === value)?.label
            : 'Select law...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search law..." />
          <CommandEmpty>No law found.</CommandEmpty>
          <CommandGroup>
            {laws.map(law => (
              <CommandItem
                key={law.value}
                value={law.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? '' : currentValue)
                  setter(currentValue === value ? '' : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === law.value ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {law.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
