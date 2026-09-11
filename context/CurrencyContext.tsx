'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CurrencyCode, CurrencyConfig } from '@/types';

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: {
    code: 'USD',
    symbol: '$',
    rate: 1.0,
    format: (amt: number) => `$${amt.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`,
  },
  INR: {
    code: 'INR',
    symbol: '₹',
    rate: 86.5,
    format: (amt: number) => `₹${Math.round(amt * 86.5).toLocaleString('en-IN')}`,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    rate: 0.92,
    format: (amt: number) => `€${(amt * 0.92).toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`,
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    rate: 0.79,
    format: (amt: number) => `£${(amt * 0.79).toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`,
  },
};

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (amountUsd: number) => string;
  convertPrice: (amountUsd: number) => number;
  symbol: string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>('USD');

  useEffect(() => {
    const saved = localStorage.getItem('jpr_currency') as CurrencyCode;
    if (saved && CURRENCIES[saved]) {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code);
    localStorage.setItem('jpr_currency', code);
  };

  const formatPrice = (amountUsd: number): string => {
    const config = CURRENCIES[currency] || CURRENCIES.USD;
    return config.format(amountUsd);
  };

  const convertPrice = (amountUsd: number): number => {
    const config = CURRENCIES[currency] || CURRENCIES.USD;
    return Math.round(amountUsd * config.rate * 100) / 100;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        convertPrice,
        symbol: CURRENCIES[currency]?.symbol || '$',
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
