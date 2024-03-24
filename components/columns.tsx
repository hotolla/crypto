import * as React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { Button } from '@mui/material';
import { GridValueFormatterParams } from '@mui/x-data-grid';
import { changePercent } from '@/helpers/changePercent';

export const columns = [
  { field: 'symbol', headerName: 'Symbol', width: 80, cellClassName: 'symbol' },
  { field: 'name', headerName: 'Name', width: 100 },
  { field: 'priceUsd', headerName: 'Price USD', width: 140 },
  { 
    field: 'changePercent24Hr',
    headerName: 'Change 24Hr, %',
    width: 120,
    valueFormatter: (params: GridValueFormatterParams) => changePercent (params),
    cellClassName: (params: any) => {
      if (params.value == null) {
        return '';
      }

      return clsx('color', {
        negative: params.value < 0,
        positive: params.value > 0
      });
    }
  },
  { field: 'volumeUsd24Hr', headerName: 'Volume Usd 24Hr', width: 120 },
  { field: 'marketCapUsd', headerName: 'market capital. Usd', width: 120 },
  {
    field: 'Buy',
    headerName: '',
    width: 80,
    renderCell: (currency: any) => 
    <Link href={`/markets/${currency.id}`} color="info.main"><Button>Buy</Button></Link>
  }
];

