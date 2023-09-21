'use client';

import { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';

import { TabItem } from './TabItem';
import { Entry } from '../Entry';

export const EntriesTabs = () => {
  const [currentTab, setCurrentTab] = useState<string>('all');

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
          <Entry
            variant="income"
            value={3000}
            date="09/05/2023"
            description="Client payment"
          />

          <Entry
            variant="outcome"
            value={700}
            date="09/18/2023"
            description="Groceries"
          />
        </div>
      </Tabs.Content>

      <Tabs.Content value="income">
        <p>Income</p>
      </Tabs.Content>

      <Tabs.Content value="outcome">
        <p>Outcome</p>
      </Tabs.Content>
    </Tabs.Root>
  );
};
