'use client';

import { useEffect } from 'react';

import { start } from '@/redux/slices/entry';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';

import { Loader } from '@/app/components/Loader';
import { EntriesTabs } from '@/app/components/EntriesTab';

const Entries = () => {
  const dispatch = useAppDispatch();

  const { entries } = useAppSelector((store) => store.entry);

  useEffect(() => {
    if (!entries?.length) {
      dispatch(start());
    }
  }, [dispatch, entries?.length]);

  if (!entries.length) {
    return <Loader />;
  }

  return (
    <main className="flex h-full w-full flex-1 flex-col px-5 py-8">
      <div className="flex w-full max-w-app flex-col gap-8 self-center">
        <EntriesTabs />
      </div>
    </main>
  );
};

export default Entries;
