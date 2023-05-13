import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { DataTable } from '../ui/data-table'
import { agentColumns, dealerColumns } from './column'
import type { BankResponse } from '@/lib/bank'

interface BankResponseListProps {
  banks: BankResponse[] | undefined
  isLoading: boolean
}

function BankResponseList(props: BankResponseListProps) {
  return (
    <div className='max-w-[1200px] w-full'>
      <Tabs defaultValue="dealer" >
        <TabsList>
          <TabsTrigger value="dealer">Поставщик</TabsTrigger>
          <TabsTrigger value="agent">Агент</TabsTrigger>
        </TabsList>
        <TabsContent value="dealer">
          <Card>
            <CardHeader>
              <CardTitle>Поставщики</CardTitle>
              <CardDescription>Описание</CardDescription>
            </CardHeader>
            <CardContent>
              {props.banks && <DataTable columns={dealerColumns} data={props.banks} />}

              {/* <div className='grid grid-cols-3 mb-3 w-full'>
                <div className='text-muted-foreground text-sm'>Банк</div>
                <div className='text-muted-foreground text-sm'>Стоимость, ₽</div>
              </div>
              {props.isLoading
                ? [...Array(5)].map((item, i) => {
                  return (
                    <div key={i} className='grid grid-cols-3 w-full pb-3'>
                      <div className='flex flex-col gap-2'>
                        <Skeleton className="h-4 w-[150px]" />
                        <Skeleton className="h-3 w-[100px]" />
                      </div>
                      <div className='flex flex-col gap-2'>
                        <Skeleton className="h-4 w-[150px]" />
                        <Skeleton className="h-3 w-[100px]" />
                      </div>
                      <div>
                        <Skeleton className="h-10 w-[150px]" />
                      </div>
                    </div>
                  )
                })
                : (props.banks && props.banks.map((bank) => {
                  return (
                    <div key={bank.id} className='grid grid-cols-3 w-full pb-3'>
                      <div >
                        <h1>{bank.name}</h1>
                        <h3 className='text-muted-foreground text-xs'>{bank.rating}</h3>
                      </div>
                      <div>
                        <h1>{bank.discount_price}</h1>
                        <h3 className='text-muted-foreground text-xs'>{bank.discount_price_percent}</h3>
                      </div>
                    </div>)
                }))} */}
            </CardContent>
          </Card>

        </TabsContent>
        <TabsContent value="agent">
          <Card>
            <CardHeader>
              <CardTitle>Поставщики</CardTitle>
              <CardDescription>Описание</CardDescription>
            </CardHeader>
            <CardContent>
              {props.banks && <DataTable columns={agentColumns} data={props.banks} />}
              {/* <div className='grid grid-cols-3 mb-3 w-full'>
                <div className='text-muted-foreground text-sm'>Банк</div>
                <div className='text-muted-foreground text-sm'>Стоимость, ₽</div>
              </div>
              {props.isLoading
                ? [...Array(5)].map((item, i) => {
                  return (
                    <div key={i} className='grid grid-cols-3 w-full pb-3'>
                      <div className='flex flex-col gap-2'>
                        <Skeleton className="h-4 w-[150px]" />
                        <Skeleton className="h-3 w-[100px]" />
                      </div>
                      <div className='flex flex-col gap-2'>
                        <Skeleton className="h-4 w-[150px]" />
                        <Skeleton className="h-3 w-[100px]" />
                      </div>
                      <div>
                        <Skeleton className="h-10 w-[150px]" />
                      </div>
                    </div>
                  )
                })
                : (props.banks && props.banks.map((bank) => {
                  return (
                    <div key={bank.id} className='grid grid-cols-3 w-full pb-3'>
                      <div >
                        <h1>{bank.name}</h1>
                        <h3 className='text-muted-foreground text-xs'>{bank.rating}</h3>
                      </div>
                      <div>
                        <h1>{bank.discount_price}</h1>
                        <h3 className='text-muted-foreground text-xs'>{bank.discount_price_percent}</h3>
                      </div>
                    </div>)
                }))} */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs >
    </div >
  )
}

export default BankResponseList
