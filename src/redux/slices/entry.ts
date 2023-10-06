import { createSlice } from '@reduxjs/toolkit';

import { Entry } from '@/types';
import { entries } from '@/database';

interface EntryState {
  entries: Entry[];
  isLoading: boolean;
}

const initialState: EntryState = {
  entries: [],
  isLoading: false,
};

const entrySlice = createSlice({
  name: 'entry',
  initialState,

  reducers: {
    start: (state) => {
      const storedEntries = localStorage.getItem('@finax:entries');

      if (!storedEntries) {
        localStorage.setItem('@finax:entries', JSON.stringify(entries));

        state.entries.push(...entries);
      }

      if (storedEntries) {
        const parsedEntries = JSON.parse(storedEntries);

        state.entries.push(...parsedEntries);
      }
    },
    // add: (state, action) => { },
    // remove: (state, action) => { },
  },
});

export const entry = entrySlice.reducer;
export const { start /* add, remove */ } = entrySlice.actions;
