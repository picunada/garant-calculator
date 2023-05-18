
import React, { FC, useEffect, useState } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import Subheading from '../ui/subheading'
import { Application } from '@/lib/application'
import { BankResponse } from '@/lib/bank'
import { options } from './option-input'
import { useToast } from '../ui/use-toast'

interface ApplicationFormProps {
  bank: BankResponse
  law: string
  sum: string
  period: string
  advance: string
  type: string
}

export const ApplicationForm: FC<ApplicationFormProps> = ({
  bank,
  law,
  sum,
  period,
  advance,
  type
}) => {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [email, setEmail] = useState('')
  const [inn, setInn] = useState('')
  const [purchaseNumber, setPurchaseNumber] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const sendRequest = () => {
    if (!email || !inn || !purchaseNumber)
      return toast({
        title: 'Ошибка',
        description: 'Проверьте наличие ввода во все поля',
        variant: "destructive"
      })

    const application: Application = {
      email: email,
      inn: inn,
      purchaseNumber: purchaseNumber,
      advance: advance,
      bank: bank.name,
      bank_sum: bank.price,
      law: law,
      period: period,
      sum: sum,
      type: options.find((pur) => pur.law = law)?.options.find((opt) => opt.value === type)?.name as string
    }

    fetch('/api/application', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(application)
    })

    toast({
      title: 'Успешно',
      description: 'Заявка успешно отправленна'
    })
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className='w-full h-[3.25rem]'>Получить cкидку %</Button>
      </SheetTrigger>
      <SheetContent className='rounded-t-3xl md:rounded-none md:w-1/2 lg:w-1/3 pt-10'
        position={windowSize.innerWidth >= 768 ? 'right' : 'bottom'}
        size={windowSize.innerWidth >= 768 ? 'default' : 'lg'}>
        <SheetHeader>
          <SheetTitle>Оформить гарантию со скидкой</SheetTitle>
          <SheetDescription>
            Проверим возможность получения гарантии
            Запросим нужные документы для оформления
          </SheetDescription>
        </SheetHeader>
        <div className='py-4 flex flex-col gap-3'>
          <Input className='' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input className='' placeholder='ИНН' value={inn} onChange={(e) => setInn(e.target.value)} />
          <Input className='' placeholder='№ Закупки' value={purchaseNumber} onChange={(e) => setPurchaseNumber(e.target.value)} />
        </div>
        <SheetFooter className='flex w-full items-center gap-3'>
          <Button onClick={sendRequest} className='w-[12rem]' type="submit">Отправить</Button>
        </SheetFooter>
        <div className='text-xs text-center text-muted-foreground mt-3'>
          Нажимая кнопку, я принимаю пользовательское соглашение и подтверждаю, что ознакомлен и согласен с политикой обработки персональных данных сайта.
        </div>
      </SheetContent>
    </Sheet>
  )
}

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}
