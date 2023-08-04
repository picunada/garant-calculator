import { createContext, use, useCallback, useEffect, useState } from 'react'
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

  const [law, setLaw] = useState('44')
  const [option, setOption] = useState('i')
  const [period, setPeriod] = useState('')
  const [advance, setAdvance] = useState(false)
  const [sum, setSum] = useState('')
  const [procurementNumber, setProcurementNumber] = useState('')
  const [procurementDescription, setProcurementDescription] = useState('')
  const [initFetch, setInitFetch] = useState(false)

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
  }, [searchParams, law, option, period, advance, sum])

  const {
    data: banks,
    trigger,
    isMutating,
  } = useSWRMutation('https://calc.progarantii.ru/v4', fetchBankResponse)

  useEffect(() => {
    if (searchParams.has('law'))
      setLaw(searchParams.get('law') as string)

    if (searchParams.has('days'))
      setPeriod(searchParams.get('days') as string)

    if (searchParams.has('type'))
      setOption(searchParams.get('type') as string)

    if (searchParams.has('sum'))
      setSum(searchParams.get('sum') as string)

    if (searchParams.has('advance'))
      setAdvance(searchParams.get('advance') === 'true' ? true : false)

    if (searchParams.has('procurementNumber'))
      setProcurementNumber(searchParams.get('procurementNumber') as string)

    if (searchParams.has('procurementDescription'))
      setProcurementDescription(searchParams.get('procurementDescription') as string)

    if (searchParams.toString().length > 0)
      setInitFetch(true)

  }, [searchParams])

  useEffect(() => {
    trigger({
      k: process.env.NEXT_PUBLIC_API_KEY as string,
      s: `${sum.replace(/\D/g, '')}руб`,
      d: period.replace(' ', ''),
      t: law,
      a: advance ? 'y' : 'n',
      m: option,
    })
  }, [initFetch])

  return (
    <>
      {procurementNumber && procurementDescription && <div className='max-w-[1200px] w-full flex flex-col rounded-2xl border border-border p-4 gap-4'>
        <h1 className='text-lg font-semibold leading-none tracking-tight'>
          Закупка №{procurementNumber}
        </h1>
        <p className='text-sm text-muted-foreground'>
          {procurementDescription}
        </p>
      </div>}
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

'http://localhost:3000/?law=223&days=30&sum=3300000&type=i&procurementNumber=12341234123&procurementDescription=Обеспечение участия артиста-исполнителя Дениса Мацуева (фортепиано) в концертной программе 29.09.2023 г., проводимой в Государственном бюджетном учреждении культуры города Москвы «Московский международный Дом музыки»'
