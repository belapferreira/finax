import { Header } from '@/components/Header';
import { Entry } from '@/components/Entry';

export default function Home() {
  return (
    <div className="flex h-screen w-full flex-col bg-gray-900">
      <Header />

      <main className="flex w-full max-w-app flex-col gap-8 self-center px-5 py-8">
        <Entry
          date="09/05/2023"
          description="Client payment"
          variant="income"
        />

        <Entry date="09/18/2023" description="Groceries" variant="outcome" />
      </main>
    </div>
  );
}
