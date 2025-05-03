
/**
 * Format a number as Kenyan Shillings with thousand separators
 */
export const formatCurrency = (amount: number): string => {
  return `KSH ${amount.toLocaleString()}`;
};

/**
 * Format currency in StockX style (green color for positive values)
 */
export const formatCurrencyStockX = (amount: number): string => {
  return `KSH ${amount.toLocaleString()}`;
};

/**
 * Format currency for checkout display (more detailed with decimal places)
 */
export const formatCurrencyDetailed = (amount: number): string => {
  return `KSH ${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
};

/**
 * Confirm an action with a window confirm dialog
 */
export const confirmAction = (message: string): boolean => {
  return window.confirm(message);
};
