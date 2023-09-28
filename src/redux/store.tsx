import { configureStore, createSlice } from '@reduxjs/toolkit';

import database from '@/database/db.json';

const entrySlice = createSlice({
  name: 'entry',
  initialState: database,

  reducers: {
    addEntry: (state, action) => {},
    deleteEntry: (state, action) => {},
  },
});

export const store = configureStore({
  reducer: {
    entry: entrySlice.reducer,
  },
});

export const { addEntry, deleteEntry } = entrySlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
