import { tv, VariantProps } from 'tailwind-variants';
import { CiExport, CiImport } from 'react-icons/ci';

const entry = tv({
  base: 'flex gap-10 w-full md:w-[90%] self-center justify-between px-6 py-4 border border-solid rounded-md',
  variants: {
    variant: {
      income: 'border-cyan-800/40',
      outcome: 'border-rose-900/50',
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
    <div className={entry({ variant })}>
      <div className="flex w-full flex-col gap-3 md:flex-row md:gap-10">
        <span className="text-gray-300/60">{date}</span>
        <span className="flex flex-1 font-medium text-gray-300/70">
          {description}
        </span>
        <span className="font-semibold text-gray-300/80">{`$ ${value}`}</span>
      </div>

      <div>
        {isIncome ? (
          <CiImport size={20} color="#06b6d4" />
        ) : (
          <CiExport size={20} color="#f43f5e" />
        )}
      </div>
    </div>
  );
};
