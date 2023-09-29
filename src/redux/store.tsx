import { configureStore } from '@reduxjs/toolkit';

import { entry } from './slices/entry';

export const store = configureStore({
  reducer: {
    entry: entry,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
