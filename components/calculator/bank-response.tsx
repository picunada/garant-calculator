import React, { useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { DataTable } from '../ui/data-table'
import { dealerColumns, loadingColumns } from './column'
import type { BankResponse } from '@/lib/bank'

interface BankResponseListProps {
  banks: BankResponse[] | undefined
  isLoading: boolean
}

function BankResponseList(props: BankResponseListProps) {

  useEffect(() => {
    console.log(props.banks)
  }, [props.banks])

  return (
    <div className='max-w-[1200px] w-full'>
      <Tabs defaultValue="dealer" >
        <TabsContent value="dealer">
          <Card>
            <CardHeader>
              <CardTitle>Поставщики</CardTitle>
              <CardDescription>Описание</CardDescription>
            </CardHeader>
            <CardContent>
              {props.isLoading ? <DataTable columns={loadingColumns} data={[...Array(5)]} /> : (Array.isArray(props.banks) && <DataTable columns={dealerColumns} data={props.banks.filter((value) => { return value.price != '-' })} />)}
            </CardContent>
          </Card>

        </TabsContent>
      </Tabs >
    </div >
  )
}

export default BankResponseList
