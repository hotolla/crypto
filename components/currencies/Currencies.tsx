'use client'

import * as React from 'react';
import { useEffect, useContext, useState} from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { DataGrid, GridValueFormatterParams } from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { changePercent } from '../../helpers/changePercent';
import { CurrenciesContext } from './CurrenciesProvider';

const columnsForMobile = [
  { field: 'symbol', headerName: 'Symbol', width: 70, cellClassName: 'symbol' },
  { field: 'name', headerName: 'Name', width: 90 },
  { field: 'priceUsd', headerName: 'Price USD', width: 100 },
  {
    field: 'Buy',
    headerName: '',
    width: 70,
    renderCell: (currencies: any) => 
    <Link href={`/markets/${currencies.id}`} color="info.main"><Button>More</Button></Link>
  }
];

const columns = [
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
    renderCell: (currencies: any) =>
      <Link href={`/markets/${currencies.id}`} color="info.main"><Button>More</Button></Link>
  }
];

export const Currencies = () => {
  const { currencies, fetchCurrencies } = useContext(CurrenciesContext);
  const [ isMobile, setIsMobile ] = useState(false);
 
  useEffect(() => {
    const interval = setInterval(() => {
      fetchCurrencies();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener('resize', checkMobile);
    checkMobile();
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const modifiedColumns = isMobile ? columnsForMobile.map(column=> ({ ...column }))
    : columns.map(column => ({ ...column, })
  );

  return (
    <Box
      sx={{
        width: { xs: '100%', lg: '56%' },
        marginRight: 'auto',
        marginLeft: 'auto',
        marginBottom: 4,
        '& .color.negative': { color: 'error.main' },
        '& .color.positive': { color: 'success.main' },
        '& .symbol': { fontWeight: 'bold' }
      }}
    >
      <Typography textAlign="center" mt={1} variant='h4'>Markets Overview</Typography>
      <Typography textAlign="center" mt={1} variant='h6'>Trading Data for all cryptos</Typography>

      <DataGrid
        checkboxSelection
        rows={currencies}
        columns={modifiedColumns}
        sx={{ marginTop:3 }}
        disableRowSelectionOnClick
        slotProps={{
          baseCheckbox: {
            icon: <StarBorderIcon />,
            checkedIcon: <StarIcon />
          }
        }}
      />
    </Box>
  );
};
