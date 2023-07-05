import { createContext, useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
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
import CalculatorProvider from '../providers/calculator-provider'

function Calculator() {
  const searchParams = useSearchParams()

  const [law, setLaw] = useState('')
  const [option, setOption] = useState('')
  const [period, setPeriod] = useState('')
  const [advance, setAdvance] = useState(false)
  const [sum, setSum] = useState('')

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
    return response.data
  }, [])

  const {
    data: banks,
    trigger,
    isMutating,
  } = useSWRMutation('https://calc.progarantii.ru/v4', fetchBankResponse)

  useEffect(() => {
    if (searchParams.has('law')) {
      console.log(searchParams.get('law'))
      setLaw(searchParams.get('law') as string)
    }


    if (searchParams.has('days'))
      setPeriod(searchParams.get('days') as string)

    if (searchParams.has('type'))
      setOption(searchParams.get('type') as string)

    if (searchParams.has('sum'))
      setSum(searchParams.get('sum') as string)

    if (searchParams.has('advance'))
      setAdvance(searchParams.get('advance') === 'true' ? true : false)

  }, [searchParams])

  return (
    <>
      <div className="max-w-[1200px] w-full flex flex-col rounded-2xl border border-border p-4 gap-4">
        <div className='flex flex-col md:flex-row gap-3 items-center justify-between'>
          <LawCombobox setter={setLaw} value={law} />

          <SumInput setter={setSum} value={sum} />
          <CalculatorDatePicker setter={setPeriod} value={period} />
        </div>
        <div className='flex justify-between md:flex-row gap-3 items-center'>
          <div className='flex flex-row gap-3 items-center'>
            <OptionInput setter={setOption} value={option} law={law} />

            <div className={`flex items-center justify-start  space-x-2 ${!['i', 'g'].includes(option) && 'invisible'}`}>
              <Switch checked={advance} onCheckedChange={(value: boolean) => setAdvance(value)} id="advance" />
              <Label htmlFor="advance">Аванс</Label>
            </div>
          </div>

          <Button onClick={() => trigger({
            k: process.env.NEXT_PUBLIC_API_KEY as string,
            s: `${sum.replace(/\D/g, '')}руб`,
            d: period.replace(' ', ''),
            t: law,
            a: advance ? 'y' : 'n',
            m: option,
          })}>
            Рассчитать
          </Button>
        </div>
      </div >
      <CalculatorProvider value={[law, option, period, advance, sum]}>
        <BankResponseList banks={banks} isLoading={isMutating} />
      </CalculatorProvider>

    </>

  )
}

export default Calculator
