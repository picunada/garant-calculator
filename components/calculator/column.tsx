'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { Button } from '../ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { Skeleton } from '../ui/skeleton'
import type { BankResponse } from '@/lib/bank'
import { ApplicationForm } from './application-form'
import { useContext } from 'react'
import { CalculatorContext } from '../providers/calculator-provider'

export const dealerColumns: ColumnDef<BankResponse>[] = [
  {
    accessorKey: 'name',
    header: () => <div className='text-muted-foreground text-sm'>Банк</div>,
    cell: ({ row }) => {
      return (
        <div >
          <h1 className='text-xs md:text-base'>{row.original.name}</h1>
        </div>
      )
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className='flex items-center gap-1'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Стоимость
          <HoverCard>
            <HoverCardTrigger>
              <kbd className="pointer-events-none inline-flex h-4 select-none items-center gap-1 rounded border border-border bg-muted px-0.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">?</span>
              </kbd>
            </HoverCardTrigger>
            <HoverCardContent>
              Стоимость по базовым тарифам банка.
            </HoverCardContent>
          </HoverCard>
          {column.getIsSorted() && (column.getIsSorted() === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />)}
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div>
          <h1 className='text-xs md:text-base'>{row.original.price} руб</h1>
        </div>
      )
    },
  },
  {
    header: ' ',
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [law, option, period, advance, sum] = useContext(CalculatorContext)
      return (
        <div className='flex items-center justify-end'>
          {row.original.price === '-' ?
            row.original.price :
            <ApplicationForm bank={row.original} advance={advance ? 'да' : 'нет'} law={law} period={period} sum={sum} type={option} />}
        </div>
      )
    },
  },
]

export const loadingColumns: ColumnDef<BankResponse>[] = [
  {
    accessorKey: '0',
    header: () => <div className='text-muted-foreground text-sm'>Банк</div>,
    cell: () => {
      return (
        <div className='flex flex-col gap-2'>
          <Skeleton className="h-3.5 w-[80px] sm:w-[150px]" />
          <Skeleton className="h-2.5 w-[50px] sm:w-[100px]" />
        </div>
      )
    },
  },
  {
    accessorKey: '1',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className='flex items-center gap-1'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Стоимость
          <HoverCard>
            <HoverCardTrigger>
              <kbd className="pointer-events-none inline-flex h-4 select-none items-center gap-1 rounded border border-border bg-muted px-0.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">?</span>
              </kbd>
            </HoverCardTrigger>
            <HoverCardContent>
              Стоимость по базовым тарифам банка.
            </HoverCardContent>
          </HoverCard>
          {column.getIsSorted() && (column.getIsSorted() === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />)}
        </Button>
      )
    },
    cell: () => {
      return (
        <div className='flex flex-col gap-2'>
          <Skeleton className="h-3.5 w-[80px] sm:w-[150px]" />
          <Skeleton className="h-2.5 w-[50px] sm:w-[100px]" />
        </div>
      )
    },
  },
  {
    accessorKey: '2',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className='flex items-center gap-1'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Со скидкой
          <HoverCard>
            <HoverCardTrigger>
              <kbd className="pointer-events-none inline-flex h-4 select-none items-center gap-1 rounded border border-border bg-muted px-0.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">?</span>
              </kbd>
            </HoverCardTrigger>
            <HoverCardContent>
              Стоимость с учетом возможной скидки банка.
            </HoverCardContent>
          </HoverCard>
          {column.getIsSorted() && (column.getIsSorted() === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />)}
        </Button>
      )
    },
    cell: () => {
      return (
        <div className='flex flex-col gap-2'>
          <Skeleton className="h-2.5 w-[30px]" />
          <Skeleton className="h-3.5 w-[80px] sm:w-[150px]" />
          <Skeleton className="h-3 w-[50px] sm:w-[100px]" />
        </div>
      )
    },
  },
]
