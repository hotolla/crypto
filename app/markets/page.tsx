"use client";

import * as React from 'react';
import { CurrenciesProvider } from '@/components/currencies/CurrenciesProvider';
import { Currencies } from '@/components/currencies/Currencies';

export default function Markets() {
  return (
    <CurrenciesProvider>
      <Currencies />
    </CurrenciesProvider>
  );
};
