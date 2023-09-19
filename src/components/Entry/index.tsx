import { tv, VariantProps } from 'tailwind-variants';
import { CiExport, CiImport } from 'react-icons/ci';

const entry = tv({
  base: 'flex gap-8 w-[90%] justify-between px-8 py-4 border border-solid rounded-md',
  variants: {
    variant: {
      income: 'self-start border-teal-950',
      outcome: 'self-end border-rose-950',
    },
  },
});

interface EntryProps extends VariantProps<typeof entry> {
  date: string;
  description: string;
}

export const Entry = ({ date, description, variant }: EntryProps) => {
  const isIncome = variant === 'income';

  return (
    <div className={entry({ variant })}>
      <div className="flex flex-col gap-2">
        <strong className="text-gray-400">Date</strong>
        <span className="text-gray-300">{date}</span>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <strong className="text-gray-400">Description</strong>
        <span className="text-gray-300">{description}</span>
      </div>

      {isIncome ? (
        <CiImport size={24} color="#14b8a6" />
      ) : (
        <CiExport size={24} color="#f43f5e" />
      )}
    </div>
  );
};
