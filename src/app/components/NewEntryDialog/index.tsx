import { ChangeEvent, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import { Button } from '@/app/components/Button';
import { Select } from '@/app/components/Select';

export const NewEntryDialog = () => {
  const [date, setDate] = useState('');

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputDate = event.target.value;

    console.log('input date', inputDate);
    // setDate(inputDate);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger className="self-end" asChild>
        <Button cta="New entry" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray-800/50 data-[state=open]:animate-overlayShow" />

        <Dialog.Content className="fixed left-[50%] top-[50%] flex max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] flex-col gap-6 rounded-[6px] bg-gray-900 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <strong className="text-gray-300/90">New Entry</strong>

          <form className="flex w-full flex-col gap-4">
            <div className="flex gap-4">
              <input
                placeholder="MM/DD/YYYY"
                onChange={handleDateChange}
                className="w-full bg-transparent"
              />
              <input placeholder="Value" className="w-full bg-transparent" />
            </div>

            <Select />

            <textarea placeholder="description" className="bg-transparent" />

            <Button cta="Add entry" className="self-end" />
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
