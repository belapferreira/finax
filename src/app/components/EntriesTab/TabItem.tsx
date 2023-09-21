'use client';

import { motion } from 'framer-motion';
import * as Tabs from '@radix-ui/react-tabs';

interface TabItemProps {
  value: string;
  title: string;
  isSelected: boolean;
}

export const TabItem = ({ value, title, isSelected }: TabItemProps) => {
  return (
    <Tabs.Trigger
      value={value}
      className="group relative px-1 pb-4 text-sm tracking-wide text-cyan-600 text-gray-300/90 outline-none hover:text-cyan-600 data-[state=active]:font-bold data-[state=active]:text-cyan-600"
    >
      <span className="whitespace-nowrap rounded group-focus-visible:ring-2">
        {title}
      </span>

      {isSelected && (
        <motion.div
          layoutId="activeTab"
          className="absolute -bottom-px left-0 right-0 h-0.5 bg-cyan-600"
        />
      )}
    </Tabs.Trigger>
  );
};
