import { CiExport, CiImport } from 'react-icons/ci';

interface EntryProps {
  date: string;
  description: string;
  type: "income" | "outcome"
}

export const Entry = ({ date, description, type }: EntryProps) => {
  const isIncome = type === 'income';

  return (
    <div className={`flex gap-8 w-[90%] justify-between px-8 py-4 border border-solid border-gray-800 rounded-md ${isIncome ? 'self-start' : 'self-end'}`}>
      <div className="flex flex-col gap-2">
        <strong className='text-gray-400'>Date</strong>
        <span className='text-gray-300'>{date}</span>
      </div>

      <div className="flex flex-col gap-2 flex-1">
        <strong className='text-gray-400'>Description</strong>
        <span className='text-gray-300'>{description}</span>
      </div>

      {isIncome ? <CiImport size={24} color="#14b8a6" /> : <CiExport size={24} color="#f43f5e"/> }
    </div>
  );
};
