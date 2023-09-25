import { ComponentProps, ComponentRef, forwardRef } from 'react';
import * as SelectRadix from '@radix-ui/react-select';
import { VscCheck } from 'react-icons/vsc';

type SelectItemProps = ComponentProps<typeof SelectRadix.Item>;

export const SelectItem = forwardRef<
  ComponentRef<typeof SelectRadix.Item>,
  SelectItemProps
>((props, forwardedRef) => {
  const { value, children, ...rest } = props;

  return (
    <SelectRadix.Item
      value={value}
      ref={forwardedRef}
      {...rest}
      className="flex w-full items-center justify-between px-4 py-2 text-gray-300 data-[highlighted]:bg-gray-800 data-[highlighted]:outline-none"
    >
      <SelectRadix.ItemText className="flex items-center gap-2 text-left">
        {children}
      </SelectRadix.ItemText>

      <SelectRadix.SelectItemIndicator>
        <VscCheck className="h-4 w-4 text-cyan-600" />
      </SelectRadix.SelectItemIndicator>
    </SelectRadix.Item>
  );
});

SelectItem.displayName = 'SelectItem';
