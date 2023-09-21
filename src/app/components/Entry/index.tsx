import { tv, VariantProps } from 'tailwind-variants';
import { CiExport, CiImport } from 'react-icons/ci';

const entry = tv({
  base: 'flex gap-10 w-[90%] justify-between self-center px-8 py-3 border border-solid rounded-md',
  variants: {
    variant: {
      income: 'self-start border-cyan-800/30',
      outcome: ' self-end border-rose-800/30',
    },
  },
});

interface EntryProps extends VariantProps<typeof entry> {
  date: string;
  value: number;
  description: string;
}

export const Entry = ({ date, value, description, variant }: EntryProps) => {
  const isIncome = variant === 'income';

  return (
    <div className={entry({ variant })}>
      <div className="flex flex-col gap-1">
        <strong className="text-sm text-gray-400">Date</strong>
        <span className="text-gray-300">{date}</span>
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <strong className="text-sm text-gray-400">Description</strong>
        <span className="text-gray-300">{description}</span>
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <strong className="text-sm text-gray-400">Value</strong>
        <span className="text-gray-300">{`$ ${value}`}</span>
      </div>

      {isIncome ? (
        <CiImport size={24} color="#06b6d4" />
      ) : (
        <CiExport size={24} color="#f43f5e" />
      )}
    </div>
  );
};