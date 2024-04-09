'use client'

import * as React from 'react';
import { useEffect, useContext, useState} from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { DataGrid, GridValueFormatterParams } from '@mui/x-data-grid';
import { Button, Container, Typography, useMediaQuery } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { changePercent } from '../../helpers/changePercent';
import { CurrenciesContext } from './CurrenciesProvider';
import { useTheme } from '@mui/system';

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
    renderCell: (currencies: any) => (
      <Button
        href={`/markets/${currencies.id}`}
        LinkComponent={Link}
      >
        More
      </Button>
    )
  }
];

const mobileFields = [
  'symbol',
  'name',
  'priceUsd',
  'Buy'
]

const columnsForMobile = columns.filter(({ field }) => {
  return mobileFields.includes(field);
})

export const Currencies = () => {
  const { currencies, fetchCurrencies } = useContext(CurrenciesContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const modifiedColumns = isMobile ? columnsForMobile : columns;

  useEffect(() => {
    const interval = setInterval(() => {
      fetchCurrencies();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container
      maxWidth="md"
      sx={{
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
    </Container>
  );
};
