
/**
 * Format a number as Kenyan Shillings with thousand separators
 */
export const formatCurrency = (amount: number): string => {
  return `KES ${amount.toLocaleString()}`;
};

/**
 * Format currency in StockX style (green color and specific format)
 */
export const formatCurrencyStockX = (amount: number): string => {
  return `KES ${amount.toLocaleString()}`;
};

/**
 * Confirm an action with a window confirm dialog
 */
export const confirmAction = (message: string): boolean => {
  return window.confirm(message);
};
