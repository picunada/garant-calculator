import type { Dispatch, SetStateAction } from 'react'
import React from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'

const options = [
  {
    law: '44',
    options: [
      { name: 'участие', value: 'u' },
      { name: 'исполнение', value: 'i' },
      { name: 'гарантийные обязательства', value: 'g' },
    ],
  },
  {
    law: '223',
    options: [
      { name: 'участие', value: 'u' },
      { name: 'исполнение', value: 'i' },
      { name: 'гарантийные обязательства', value: 'g' },
      { name: 'возврат аванса', value: 'v' },
    ],
  },
  {
    law: '615',
    options: [
      { name: 'исполнение', value: 'i' },
    ],
  },
]

interface OptionInputProps {
  setter: Dispatch<SetStateAction<string>>
  law: string
}

const OptionInput: React.FC<OptionInputProps> = ({
  law,
  setter,
}) => {
  return (
    <div>
      <RadioGroup onValueChange={(value: string) => setter(value)} className='flex flex-row gap-3 flex-wrap'>
        {options.find(value => value.law === law)?.options.map((option, index) => {
          return (
            <div key={index} className="flex items-center gap-2 whitespace-nowrap first-letter:uppercase text-neutral-400">
              <RadioGroupItem value={option.value} id={index} />
              <Label htmlFor={index}>{option.name}</Label>
            </div>
          )
        })}

      </RadioGroup>
    </div>
  )
}

export default OptionInput
