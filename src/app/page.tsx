import { Header } from '@/components/Header';
import { Entry } from '@/components/Entry';

export default function Home() {
  return (
    <div className='flex flex-col w-full h-screen bg-gray-900'>
      <Header />

      <main className="flex flex-col gap-8 self-center w-full max-w-app py-8">
        <Entry date="09/05/2023" description='Client payment' type="income" />

        <Entry date="09/18/2023" description='Groceries' type="outcome" />
      </main>
    </div>
  );
}
