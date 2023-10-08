export interface Entry {
  id: string | null;
  valueInCents: number | null;
  variant: 'income' | 'outcome';
  date: string | null;
  createdAt: string | null;
  description: string | null;
}
