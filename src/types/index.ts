export interface Entry {
  id: string | null;
  valueInCents: number | null;
  variant: 'income' | 'outcome';
  createdAt: string | null;
  description: string | null;
}
