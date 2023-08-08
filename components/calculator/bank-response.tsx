import React, { useEffect } from 'react'
import { DataTable } from '../ui/data-table'
import { dealerColumns, loadingColumns } from './column'
import type { BankResponse } from '@/lib/bank'

interface BankResponseListProps {
  banks: BankResponse[] | undefined
  isLoading: boolean
}

function BankResponseList(props: BankResponseListProps) {

  return (
    <div className='max-w-[1200px] w-full'>
      {props.isLoading ? <DataTable columns={loadingColumns} data={[...Array(5)]} /> : (props.banks && <DataTable columns={dealerColumns} data={props.banks} />)}
    </div >
  )
}

export default BankResponseList
