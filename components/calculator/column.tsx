'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { Button } from '../ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { Skeleton } from '../ui/skeleton'
import type { BankResponse } from '@/lib/bank'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const agentColumns: ColumnDef<BankResponse>[] = [
  {
    accessorKey: 'name',
    header: () => <div className='text-muted-foreground text-sm'>Банк</div>,
    cell: ({ row }) => {
      return (
        <div >
          <h1>{row.original.name}</h1>
          <h3 className='text-muted-foreground text-xs'>{row.original.rating}</h3>
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
          <h1>{row.original.price}</h1>
          <h3 className='text-muted-foreground text-xs'>{row.original.discount_price_percent}</h3>
        </div>
      )
    },
  },
  {
    accessorKey: 'pro_price',
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
    cell: ({ row }) => {
      return (
        <div>
          <h3 className='text-destructive/75 text-xs'>{`-${row.original.discount}`}</h3>
          <h1>{row.original.pro_price}</h1>
          <h3 className='text-muted-foreground text-xs'>{row.original.pro_price_percent}</h3>
        </div>
      )
    },
  },
]

export const dealerColumns: ColumnDef<BankResponse>[] = [
  {
    accessorKey: 'name',
    header: () => <div className='text-muted-foreground text-sm'>Банк</div>,
    cell: ({ row }) => {
      return (
        <div >
          <h1>{row.original.name}</h1>
          <h3 className='text-muted-foreground text-xs'>{row.original.rating}</h3>
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
          <h1>{row.original.price}</h1>
          <h3 className='text-muted-foreground text-xs'>{row.original.discount_price_percent}</h3>
        </div>
      )
    },
  },
  {
    header: ' ',
    cell: ({ row }) => {
      return <Button className='w-full h-[3.25rem]'>Получить cкидку %</Button>
    },
  },
]

export const loadingColumns: ColumnDef<BankResponse>[] = [
  {
    accessorKey: '0',
    header: () => <div className='text-muted-foreground text-sm'>Банк</div>,
    cell: ({ row }) => {
      return (
        <div className='flex flex-col gap-2'>
          <Skeleton className="h-3.5 w-[150px]" />
          <Skeleton className="h-2.5 w-[100px]" />
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
          <Skeleton className="h-3.5 w-[150px]" />
          <Skeleton className="h-2.5 w-[100px]" />
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
          <Skeleton className="h-3.5 w-[150px]" />
          <Skeleton className="h-3 w-[100px]" />
        </div>
      )
    },
  },
]
