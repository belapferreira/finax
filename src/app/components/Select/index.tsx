import * as SelectRadix from '@radix-ui/react-select';
import { VscChevronDown, VscChevronUp } from 'react-icons/vsc';

import { SelectItem } from './SelectItem';

export const Select = () => {
  return (
    <SelectRadix.Root>
      <SelectRadix.Trigger>
        <SelectRadix.Value placeholder="Select a type" />

        <SelectRadix.Icon>
          <VscChevronDown />
        </SelectRadix.Icon>
      </SelectRadix.Trigger>

      <SelectRadix.Portal>
        <SelectRadix.Content>
          <SelectRadix.ScrollUpButton>
            <VscChevronUp />
          </SelectRadix.ScrollUpButton>

          <SelectRadix.Viewport>
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
