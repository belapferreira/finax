import { createSlice } from '@reduxjs/toolkit';

import database from '@/database/db.json';

interface Entry {
  id: string | null;
  value: number | null;
  variant: 'income' | 'outcome' | null;
  createdAt: string | null;
  description: string | null;
}

const initialState: Entry[] = [];

const entrySlice = createSlice({
  name: 'entry',
  initialState,

  reducers: {
    start: (state) => {
      const storedEntries = localStorage.getItem('@finax:entries');

      if (!storedEntries) {
        localStorage.setItem(
          '@finax:entries',
          JSON.stringify(database.entries),
        );
      }

      if (storedEntries) {
        state.push(JSON.parse(storedEntries));
      }
    },
    // add: (state, action) => { },
    // remove: (state, action) => { },
  },
});

export const entry = entrySlice.reducer;
export const { start /* add, remove */ } = entrySlice.actions;
