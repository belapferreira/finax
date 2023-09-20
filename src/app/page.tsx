'use client';

import { Header } from '@/components/Header';
import { Entry } from '@/components/Entry';
import { BarChart } from '@/components/BarChart';

const labels = ['Jan', 'Fev', 'Mar'];
const datasetOne = [3500, 4000, 3200];
const datasetTwo = [3000, 2900, 3100];
const datasetThree = [500, 1100, 100];

export default function Home() {
  return (
    <div className="flex h-screen w-full flex-col bg-gray-900">
      <Header />

      <main className="flex w-full max-w-app flex-col gap-8 self-center px-5 py-8">
        <div className="h-72">
          <BarChart
            data={{
              labels: labels,
              datasets: [
                {
                  data: datasetOne,
                  maxBarThickness: 52,
                  backgroundColor: '#083344',
                  borderColor: '#0891b2',
                  hoverBackgroundColor: '#083344',
                  hoverBorderColor: '#0891b2',
                  borderRadius: 4,
                  borderWidth: 1,
                  label: ` Income ($)`,
                },
                {
                  data: datasetTwo,
                  maxBarThickness: 52,
                  backgroundColor: '#4c0519',
                  borderColor: '#e11d48',
                  hoverBackgroundColor: '#4c0519',
                  hoverBorderColor: '#e11d48',
                  borderRadius: 4,
                  borderWidth: 1,
                  label: ` Outcome ($)`,
                },
                {
                  data: datasetThree,
                  maxBarThickness: 52,
                  backgroundColor: '#1f2937',
                  borderColor: '#9ca3af',
                  hoverBackgroundColor: '#1f2937',
                  hoverBorderColor: '#9ca3af',
                  borderRadius: 4,
                  borderWidth: 1,
                  label: ` Balance ($)`,
                },
              ],
            }}
          />
        </div>

        <Entry
          variant="income"
          value={3000}
          date="09/05/2023"
          description="Client payment"
        />

        <Entry
          variant="outcome"
          value={700}
          date="09/18/2023"
          description="Groceries"
        />
      </main>
    </div>
  );
}
