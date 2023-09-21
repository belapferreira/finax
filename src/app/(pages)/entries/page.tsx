import { EntriesTabs } from '@/app/components/EntriesTab';

const Entries = () => {
  return (
    <main className="flex h-full w-full flex-col px-5 py-8">
      <div className="flex w-full max-w-app flex-col gap-8 self-center">
        <EntriesTabs />
      </div>
    </main>
  );
};

export default Entries;
