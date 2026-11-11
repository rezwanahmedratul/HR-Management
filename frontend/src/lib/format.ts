const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatCurrency(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return '—';
  }
  return currencyFormatter.format(value);
}

export function formatDate(value: string | null | undefined): string {
  if (!value || value.trim() === '') {
    return '—';
  }
  // If in YYYY-MM-DD format, safely parse components to prevent timezone shift
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) {
    const [, year, month, day] = match;
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  }
  return value;
}

export function formatText(value: string | null | undefined): string {
  if (!value || value.trim() === '') {
    return '—';
  }
  return value;
}
