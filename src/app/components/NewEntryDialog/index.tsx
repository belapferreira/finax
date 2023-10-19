import { ChangeEvent, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { CiMoneyBill } from 'react-icons/ci';
import { v4 as uuidv4 } from 'uuid';

import { add } from '@/redux/slices/entry';
import { useAppDispatch } from '@/redux/hooks';

import { Button } from '@/app/components/Button';
import { Select } from '@/app/components/Select';
import { Input } from '@/app/components/Input';

const items = [
  { value: 'income', label: 'Income' },
  { value: 'outcome', label: 'Outcome' },
];

export const NewEntryDialog = () => {
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState('');

  const dispatch = useAppDispatch();

  const shouldEnabledAddEntry = !!date && !!amount && !!type && !!description;

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputDate = event.target.value;
    const inputOnlyNumbers = inputDate.replace(/\D/g, '');

    if (inputOnlyNumbers.length <= 2) {
      setDate(inputOnlyNumbers);
    } else if (inputOnlyNumbers.length <= 4) {
      setDate(`${inputOnlyNumbers.slice(0, 2)}/${inputOnlyNumbers.slice(2)}`);
    } else {
      setDate(
        `${inputOnlyNumbers.slice(0, 2)}/${inputOnlyNumbers.slice(
          2,
          4,
        )}/${inputOnlyNumbers.slice(4, 8)}`,
      );
    }
  };

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    let inputAmount = event.target.value;

    // Remove non-numeric characters and leading zeros
    inputAmount = inputAmount.replace(/[^0-9]/g, '').replace(/^0+/, '');

    let formattedValue = '';
    const decimalSeparator = '.';
    const thousandSeparator = ',';

    if (inputAmount.length === 0) {
      formattedValue = '';
    } else if (inputAmount.length === 1) {
      formattedValue = '0' + decimalSeparator + '0' + inputAmount;
    } else if (inputAmount.length === 2) {
      formattedValue = '0' + decimalSeparator + inputAmount;
    } else {
      const decimalNumber = inputAmount.slice(-2);
      const integerNumber = inputAmount.slice(0, -2);

      formattedValue =
        integerNumber.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator) +
        decimalSeparator +
        decimalNumber;
    }

    setAmount(formattedValue);
  };

  const handleTypeChange = (value: string) => {
    setType(value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const inputDescription = event.target.value;
    setDescription(inputDescription);
  };

  const handleSubmit = () => {
    const createdAt = new Date();

    dispatch(
      add({
        id: uuidv4(),
        date,
        valueInCents: Number(amount.replace(/\D/g, '')),
        variant: type,
        description,
        createdAt,
      }),
    );

    setDate('');
    setAmount('');
    setType(undefined);
    setDescription('');
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger className="self-end" asChild>
        <Button cta="New entry" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray-500/50 data-[state=open]:animate-overlayShow" />

        <Dialog.Content className="fixed left-[50%] top-[50%] flex max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] flex-col gap-6 rounded-[6px] bg-gray-900 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <strong className="text-gray-300/90">New Entry</strong>

          <form className="flex w-full flex-col gap-4">
            <div className="flex gap-4">
              <Input
                name="date"
                value={date}
                placeholder="MM/DD/YYYY"
                onChange={handleDateChange}
                className="w-fit"
              />
              <Input
                name="amount"
                icon={CiMoneyBill}
                value={amount}
                placeholder="Value"
                onChange={handleAmountChange}
                className="w-full"
              />
            </div>

            <Select
              name="type"
              value={type}
              items={items}
              onValueChange={handleTypeChange}
            />

            <textarea
              name="description"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Short description"
              className="flex items-center gap-2 rounded-md border border-gray-800 bg-transparent px-4 py-2 shadow-sm outline-none focus:border-cyan-600"
            />
          </form>

          <Dialog.Close asChild>
            <Button
              cta="Add entry"
              onClick={handleSubmit}
              className="self-end"
              disabled={!shouldEnabledAddEntry}
            />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
