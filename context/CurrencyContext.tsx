'use client';

import React, { createContext, useContext } from 'react';
import { CurrencyCode, CurrencyConfig } from '@/types';
import { STORE_CURRENCY, STORE_CURRENCY_SYMBOL, STORE_LOCALE, formatINR } from '@/lib/currency';

export { STORE_CURRENCY, STORE_CURRENCY_SYMBOL, STORE_LOCALE, formatINR };

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  INR: {
    code: 'INR',
    symbol: '₹',
    rate: 1.0,
    format: (amt: number) => formatINR(amt),
  },
};

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (amountInr: number | string | null | undefined) => string;
  convertPrice: (amountInr: number) => number;
  symbol: string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const currency: CurrencyCode = 'INR';

  const setCurrency = (_code: CurrencyCode) => {
    // Single currency INR is active across the store
  };

  const formatPrice = (amountInr: number | string | null | undefined): string => {
    return formatINR(amountInr);
  };

  const convertPrice = (amountInr: number): number => {
    return Number(amountInr) || 0;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        convertPrice,
        symbol: STORE_CURRENCY_SYMBOL,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    // Return safe fallback if used outside provider
    return {
      currency: 'INR',
      setCurrency: () => {},
      formatPrice: formatINR,
      convertPrice: (amt) => Number(amt) || 0,
      symbol: '₹',
    };
  }
  return context;
};

