
import React, { FC, FormEvent, useEffect, useState } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Application } from '@/lib/application'
import { BankResponse } from '@/lib/bank'
import { options } from './option-input'
import { useToast } from '../ui/use-toast'
import ReactInputMask from 'react-input-mask'

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
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
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

  const sendRequest = async (e: FormEvent) => {
    e.preventDefault()
    if (!email || !inn || !purchaseNumber)
      return toast({
        title: 'Ошибка',
        description: 'Проверьте наличие ввода во все поля',
        variant: "destructive"
      })

    const application: Application = {
      email: email,
      name: name,
      phone: phone,
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

    await fetch('/api/application', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(application)
    }).then((res) => {
      if (res.status === 200) {
        return toast({
          title: 'Успешно',
          description: 'Заявка успешно отправленна'
        })
      } else {
        return toast({
          title: 'Ошибка',
          description: 'Ошибка запроса на сервер',
          variant: "destructive"
        })
      }
    })


  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className='h-[3.25rem]'>Оформить заявку</Button>
      </SheetTrigger>
      <SheetContent className='rounded-t-3xl md:rounded-none md:w-1/2 lg:w-1/3 pt-10'
        position={windowSize.innerWidth >= 768 ? 'right' : 'bottom'}
        size={windowSize.innerWidth >= 768 ? 'default' : 'xl'}>
        <SheetHeader>
          <SheetTitle>Оформить заявку</SheetTitle>
          <SheetDescription>
            Проверим возможность получения гарантии
            Запросим нужные документы для оформления
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={sendRequest}>
          <div className='py-4 flex flex-col gap-3'>
            <Input className='invalid:focus:outline-red-500 invalid:placeholder:text-red-500 invalid:border-red-500' type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input className='invalid:focus:outline-red-500 invalid:placeholder:text-red-500 invalid:border-red-500' placeholder='Имя' value={name} onChange={(e) => setName(e.target.value)} />
            <ReactInputMask value={phone} onChange={(e) => setPhone(e.target.value)} mask={'+7 (999)-9999-999'}>
              <Input className='invalid:focus:outline-red-500 invalid:placeholder:text-red-500 invalid:border-red-500' placeholder='Номер телефона' type='tel' />
            </ReactInputMask>
            <Input className='invalid:focus:outline-red-500 invalid:placeholder:text-red-500 invalid:border-red-500' placeholder='ИНН' value={inn} onChange={(e) => setInn(e.target.value)} />
            <Input className='invalid:focus:outline-red-500 invalid:placeholder:text-red-500 invalid:border-red-500' placeholder='№ Закупки' value={purchaseNumber} onChange={(e) => setPurchaseNumber(e.target.value)} />
          </div>
          <SheetFooter className='flex w-full items-center gap-3'>
            <Button type="submit">Отправить</Button>
          </SheetFooter>
        </form>

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
