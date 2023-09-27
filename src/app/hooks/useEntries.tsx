import { useCallback, useEffect, useState } from 'react';

export interface Entry {
  id: string;
  value: number;
  variant: 'income' | 'outcome';
  createdAt: string;
  description: string;
}

export const useEntry = () => {
  const [entries, setEntries] = useState<Entry[]>([]);

  const handleAddNewEntry = useCallback(
    (newEntry: Entry) => {
      setEntries([...entries, newEntry]);
    },
    [entries],
  );

  useEffect(() => {
    const storedEntries = localStorage.getItem('@finax:entries');

    if (storedEntries) {
      setEntries(JSON.parse(storedEntries));
    }
  }, []);

  useEffect(() => {
    if (entries.length) {
      localStorage.setItem('@finax:entries', JSON.stringify(entries));
    }

    if (!entries.length) {
      localStorage.setItem('@finax:entries', '');
    }
  }, [entries]);

  return { entries, handleAddNewEntry };
};
