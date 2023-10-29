import { createSlice } from '@reduxjs/toolkit';

import { Entry } from '@/types';
import { entries } from '@/database';

export interface EntryState {
  entries: Entry[];
}

const initialState: EntryState = {
  entries: [],
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
    add: (state, action) => {
      state.entries.push(action.payload);
    },
    remove: (state, action) => {
      const id = action.payload;

      const filteredEntries = state?.entries?.filter(
        (entry) => entry.id !== id,
      );

      state.entries = filteredEntries;

      alert('Entry successfully removed!');
    },
  },
});

export const entry = entrySlice.reducer;
export const { start, add, remove } = entrySlice.actions;
