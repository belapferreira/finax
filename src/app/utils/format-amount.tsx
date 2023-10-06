export const formatAmount = (value: number) => {
  const valueFormatted = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
  }).format(value / 100);

  return valueFormatted;
};
