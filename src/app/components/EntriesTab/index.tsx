'use client';

import { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';

import { formatAmount } from '@/app/utils/format-amount';
import { sortEntries } from '@/app/utils/sort-entries';
import { useAppSelector } from '@/redux/hooks';

import { TabItem } from './TabItem';
import { Entry } from '../Entry';

export const EntriesTabs = () => {
  const [currentTab, setCurrentTab] = useState<string>('all');

  const { entries } = useAppSelector((store) => store.entry);

  const allEntriesSorted = sortEntries({ entries: entries.slice() });

  const incomeEntries = sortEntries({
    entries: entries?.filter(({ variant }) => variant === 'income'),
  });

  const outcomeEntries = sortEntries({
    entries: entries?.filter(({ variant }) => variant === 'outcome'),
  });

  return (
    <Tabs.Root value={currentTab} onValueChange={setCurrentTab}>
      <Tabs.List className="flex w-full items-center gap-8 border-b border-gray-800">
        <TabItem
          value="all"
          title="All entries"
          isSelected={currentTab === 'all'}
        />

        <TabItem
          value="income"
          title="Income"
          isSelected={currentTab === 'income'}
        />

        <TabItem
          value="outcome"
          title="Outcome"
          isSelected={currentTab === 'outcome'}
        />
      </Tabs.List>

      <Tabs.Content value="all">
        <div className="flex flex-col gap-6 py-8">
          {allEntriesSorted?.map(
            ({ id, date, description, valueInCents, variant }, index) => (
              <Entry
                key={id}
                id={id as string}
                variant={variant}
                value={formatAmount(valueInCents as number)}
                date={date as string}
                description={description}
              />
            ),
          )}
        </div>
      </Tabs.Content>

      <Tabs.Content value="income">
        <div className="flex flex-col gap-6 py-8">
          {incomeEntries?.map(
            ({ id, date, description, valueInCents, variant }, index) => (
              <Entry
                key={id}
                id={id as string}
                variant={variant}
                value={formatAmount(valueInCents as number)}
                date={date as string}
                description={description}
              />
            ),
          )}
        </div>
      </Tabs.Content>

      <Tabs.Content value="outcome">
        <div className="flex flex-col gap-6 py-8">
          {outcomeEntries?.map(
            ({ id, date, description, valueInCents, variant }, index) => (
              <Entry
                key={id}
                id={id as string}
                variant={variant}
                value={formatAmount(valueInCents as number)}
                date={date as string}
                description={description}
              />
            ),
          )}
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
};
