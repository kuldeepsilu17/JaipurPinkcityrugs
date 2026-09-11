'use client';

import React from 'react';
import { StoreProvider } from '@/context/StoreContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { Toaster } from 'sonner';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <CurrencyProvider>
        <WishlistProvider>
          <CartProvider>
            {children}
            <Toaster
              position="top-right"
              richColors
              closeButton
              toastOptions={{
                style: {
                  fontFamily: 'var(--font-sans)',
                  borderRadius: '8px',
                  border: '1px solid #EFE7DA',
                },
              }}
            />
          </CartProvider>
        </WishlistProvider>
      </CurrencyProvider>
    </StoreProvider>
  );
}
