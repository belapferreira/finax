import * as SelectRadix from '@radix-ui/react-select';
import { VscChevronDown, VscChevronUp } from 'react-icons/vsc';

import { SelectItem } from './SelectItem';
import { ComponentProps } from 'react';

type SelectProps = ComponentProps<typeof SelectRadix.Root>;

export const Select = ({ value, onValueChange, ...rest }: SelectProps) => {
  return (
    <SelectRadix.Root value={value} onValueChange={onValueChange} {...rest}>
      <SelectRadix.Trigger className="flex w-full items-center justify-between gap-2 rounded-md border border-gray-800 px-4 py-2 shadow-sm outline-none focus:border-cyan-600 data-[placeholder]:text-gray-400">
        <SelectRadix.Value placeholder="Select a type" />

        <SelectRadix.Icon>
          <VscChevronDown className="h-5 w-5 text-gray-400" />
        </SelectRadix.Icon>
      </SelectRadix.Trigger>

      <SelectRadix.Portal>
        <SelectRadix.Content
          sideOffset={8}
          side="bottom"
          position="popper"
          className="group z-10 w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border border-gray-800 bg-gray-900"
        >
          <SelectRadix.ScrollUpButton>
            <VscChevronUp className="h-5 w-5 text-gray-400" />
          </SelectRadix.ScrollUpButton>

          <SelectRadix.Viewport asChild>
            <SelectRadix.Group>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="outcome">Outcome</SelectItem>
            </SelectRadix.Group>
          </SelectRadix.Viewport>
        </SelectRadix.Content>
      </SelectRadix.Portal>
    </SelectRadix.Root>
  );
};
