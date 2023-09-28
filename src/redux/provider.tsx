'use client';
import { ReactNode } from 'react';

import { store } from '@/redux/store';
import { Provider as ReduxProvider } from 'react-redux';

interface ProviderProps {
  children: ReactNode;
}

export const Provider = ({ children }: ProviderProps) => {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
};
