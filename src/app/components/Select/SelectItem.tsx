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
    <SelectRadix.Item value={value} ref={forwardedRef} {...rest}>
      <SelectRadix.ItemText>{children}</SelectRadix.ItemText>

      <SelectRadix.SelectItemIndicator>
        <VscCheck />
      </SelectRadix.SelectItemIndicator>
    </SelectRadix.Item>
  );
});

SelectItem.displayName = 'SelectItem';
