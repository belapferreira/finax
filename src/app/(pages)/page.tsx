'use client';

import { useEffect } from 'react';
import { CiExport, CiImport, CiCoins1, CiFileOn } from 'react-icons/ci';

import { start } from '@/redux/slices/entry';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';

import { formatAmount } from '@/app/utils/format-amount';

import { Loader } from '@/app/components/Loader';
import { Entry } from '@/app/components/Entry';
import { BarChart } from '@/app/components/BarChart';
import { NewEntryDialog } from '../components/NewEntryDialog';

const labels = ['Jan', 'Fev', 'Mar'];
const datasetOne = [3500, 4000, 3200];
const datasetTwo = [3000, 2900, 3100];
const datasetThree = [500, 1100, 100];

interface EntriesSummarizedReturn {
  totalIncome: number;
  totalOutcome: number;
}

const Home = () => {
  const dispatch = useAppDispatch();

  const { entries } = useAppSelector((store) => store.entry);

  const latestRegisters = entries?.slice(-6);

  const entriesSummarized = entries?.reduce<EntriesSummarizedReturn>(
    (accumulator, currentEntry) => {
      const isIncome = currentEntry?.variant === 'income';
      const currentValue = currentEntry?.valueInCents || 0;

      if (isIncome) {
        accumulator.totalIncome += currentValue;
      } else {
        accumulator.totalOutcome += currentValue;
      }

      return accumulator;
    },
    { totalIncome: 0, totalOutcome: 0 },
  );

  const { totalIncome, totalOutcome } = entriesSummarized;
  const balance = totalIncome - totalOutcome;

  useEffect(() => {
    if (!entries?.length) {
      dispatch(start());
    }
  }, [dispatch, entries?.length]);

  if (!entries.length) {
    return <Loader />;
  }

  return (
    <main className="flex h-full w-full flex-col px-5 py-8">
      <div className="flex w-full max-w-app flex-col gap-10 self-center">
        <section className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold text-gray-300/90">Summary</h2>

          <NewEntryDialog />

          <div className="mb-6 flex items-center justify-between gap-8">
            <div className="flex w-full flex-col gap-2 rounded-md border border-gray-800 px-6 py-4">
              <div className="flex items-center justify-between">
                <p className="text-gray-400">Incomes</p>
                <CiImport size={20} color="#06b6d4" />
              </div>

              <span className="font-semibold text-gray-300">
                {`$ ${formatAmount(totalIncome)}`}
              </span>
            </div>

            <div className="flex w-full flex-col gap-2 rounded-md border border-gray-800 px-6 py-4">
              <div className="flex items-center justify-between">
                <p className="text-gray-400">Outcomes</p>
                <CiExport size={20} color="#f43f5e" />
              </div>

              <span className="font-semibold text-gray-300">
                {`$ ${formatAmount(totalOutcome)}`}
              </span>
            </div>

            <div className="flex w-full flex-col gap-2 rounded-md border border-gray-800 px-6 py-4">
              <div className="flex items-center justify-between">
                <p className="text-gray-400">Total</p>
                <CiCoins1 size={20} color="#9ca3af" />
              </div>

              <span className="font-semibold text-gray-300">
                {`$ ${formatAmount(balance)}`}
              </span>
            </div>
          </div>

          <div className="h-64">
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
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold text-gray-300/90">
            Latest registers
          </h2>
          {!entries.length ? (
            <div className="flex flex-col items-center justify-center gap-3 self-center py-10 text-gray-400">
              <CiFileOn size={52} />

              <p>{`You don't have any entry added yet`}</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {latestRegisters?.map(
                ({ id, date, description, valueInCents, variant }, index) => (
                  <Entry
                    key={id}
                    index={index}
                    variant={variant}
                    value={formatAmount(valueInCents as number)}
                    date={date as string}
                    description={description}
                  />
                ),
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Home;
