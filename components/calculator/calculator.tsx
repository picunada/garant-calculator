import { useCallback, useState } from 'react'
import axios from 'axios'
import useSWRMutation from 'swr/mutation'
import { Switch } from '../ui/switch'
import { Label } from '../ui/label'
import { LawCombobox } from './law-combobox'
import SumInput from './sum-input'
import OptionInput from './option-input'
import CalculatorDatePicker from './calculator-datepicker'
import BankResponseList from './bank-response'
import { Button } from '@/components/ui/button'
import type { BankResponse } from '@/lib/bank'

function Calculator() {
  const [law, setLaw] = useState('')
  const [option, setOption] = useState('')
  const [period, setPeriod] = useState('')
  const [advance, setAdvance] = useState(false)
  const [sum, setSum] = useState('')

  const [response, setResponse] = useState<any>()

  const fetchBankResponse = useCallback(async (url: string, { arg }: {
    arg: {
      k: string
      s: string
      d: string
      t: string
      a: string
      m: string
    }
  }) => {
    const response = await axios.get<BankResponse[]>('https://calc.progarantii.ru/v4', {
      params: arg,
      headers: {
        // 'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })
    console.log(response.data)
    return response.data
  }, [])

  const {
    data: banks,
    error,
    trigger,
    reset,
    isMutating,
  } = useSWRMutation('https://calc.progarantii.ru/v4', fetchBankResponse)

  return (
    <>
      <div className="max-w-[1200px] w-full flex flex-col rounded-2xl border border-border p-4 gap-4">
        <div className='flex flex-row gap-3 items-center justify-between'>
          <LawCombobox setter={setLaw} />

          <OptionInput setter={setOption} law={law} />

          { }
          <div className={`flex items-center space-x-2 ${!['i', 'g'].includes(option) && 'invisible'}`}>
            <Switch checked={advance} onCheckedChange={(value: boolean) => setAdvance(value)} id="advance" />
            <Label htmlFor="advance">Аванс</Label>
          </div>
        </div>
        <div className='flex flex-row gap-3 items-center'>
          <SumInput setter={setSum} />
          <CalculatorDatePicker setter={setPeriod} />
          <Button onClick={() => trigger({
            k: 'ahr4oi2aez0F1262516oagah4Kooso',
            s: `${sum.replace(/\D/g, '')}руб`,
            d: period,
            t: law,
            a: advance ? 'y' : 'n',
            m: option,
          })} className='w-35'>
            Рассчитать
          </Button>
        </div>
      </div >
      <BankResponseList banks={banks} isLoading={isMutating} />
    </>

  )
}

export default Calculator
