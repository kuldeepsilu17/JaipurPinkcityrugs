export const STORE_CURRENCY = 'INR';
export const STORE_CURRENCY_SYMBOL = '₹';
export const STORE_LOCALE = 'en-IN';

const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

/**
 * Centralized INR price formatter utility.
 * Examples:
 * formatINR(999) -> "₹999"
 * formatINR(2499) -> "₹2,499"
 * formatINR(125000) -> "₹1,25,000"
 */
export const formatINR = (amount: number | string | null | undefined): string => {
  const num = typeof amount === 'string' ? parseFloat(amount) : Number(amount);
  if (isNaN(num) || num === null || num === undefined) {
    return '₹0';
  }
  return inrFormatter.format(Math.round(num));
};
