import { useCallback } from 'react';
import { tv, VariantProps } from 'tailwind-variants';
import { CiExport, CiImport, CiTrash } from 'react-icons/ci';

import { useAppDispatch } from '@/redux/hooks';
import { remove } from '@/redux/slices/entry';

const entry = tv({
  base: 'flex px-4 md:gap-10 w-full md:w-[90%] self-center justify-between md:px-6 py-4 border border-solid rounded-md',
  variants: {
    variant: {
      income: 'border-cyan-500/20',
      outcome: 'border-rose-500/20',
    },
  },
});

interface EntryProps extends VariantProps<typeof entry> {
  id: string;
  date: string;
  value: string;
  description: string | null;
}

export const Entry = ({
  id,
  date,
  value,
  description,
  variant,
}: EntryProps) => {
  const dispatch = useAppDispatch();

  const isIncome = variant === 'income';

  const handleRemoveEntry = useCallback(
    (id: string) => {
      dispatch(remove(id));
    },
    [dispatch],
  );

  return (
    <div className={entry({ variant })}>
      <div className="flex w-full flex-col gap-3 md:flex-row md:items-center md:gap-10">
        <span className="text-gray-300/60">{date}</span>
        <span className="flex flex-1 font-medium text-gray-300/70">
          {description}
        </span>
        <span className="font-semibold text-gray-300/80">{`$ ${value}`}</span>
      </div>

      <div className="flex p-3 md:items-center md:p-0">
        {isIncome ? (
          <CiImport size={20} color="#06b6d4" />
        ) : (
          <CiExport size={20} color="#f43f5e" />
        )}
      </div>

      <button
        onClick={() => handleRemoveEntry(id)}
        className="self-start rounded-sm p-3 text-gray-400 hover:bg-gray-800 md:self-center"
      >
        <CiTrash size={20} />
      </button>
    </div>
  );
};
