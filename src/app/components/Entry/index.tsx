import { tv, VariantProps } from 'tailwind-variants';
import { CiExport, CiImport } from 'react-icons/ci';

const entry = tv({
  base: 'flex gap-10 w-[90%] self-center justify-between px-6 py-4 border border-solid rounded-md',
  variants: {
    variant: {
      income: 'border-cyan-800/50',
      outcome: 'border-rose-800/50',
    },
  },
});

interface EntryProps extends VariantProps<typeof entry> {
  index: number;
  date: string;
  value: string;
  description: string | null;
}

export const Entry = ({
  index,
  date,
  value,
  description,
  variant,
}: EntryProps) => {
  const isIncome = variant === 'income';

  return (
    <>
      {index === 0 && (
        <div className="flex w-[90%] justify-between gap-10 self-center px-6 text-sm text-gray-400">
          <span className="w-28">Date</span>
          <span className="flex-1">Description</span>
          <span className="-ml-10 flex-1 self-start">Value</span>
        </div>
      )}

      <div className={entry({ variant })}>
        <div className="flex w-28 flex-col gap-1">
          <span className="text-gray-300">{date}</span>
        </div>

        <div className="flex flex-1 flex-col gap-1">
          {description && <span className="text-gray-300">{description}</span>}
        </div>

        <div className="flex flex-1 flex-col gap-1">
          <span className="text-gray-300">{`$ ${value}`}</span>
        </div>

        {isIncome ? (
          <CiImport size={20} color="#06b6d4" />
        ) : (
          <CiExport size={20} color="#f43f5e" />
        )}
      </div>
    </>
  );
};
