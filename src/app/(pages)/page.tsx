'use client';

import { useEffect, useState } from 'react';
import { CiExport, CiImport, CiCoins1, CiFileOn } from 'react-icons/ci';

import { RootState } from '@/redux/store';
import { start } from '@/redux/slices/entry';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';

import { formatAmount } from '@/app/utils/format-amount';
import { sortEntries } from '@/app/utils/sort-entries';

import { Loader } from '@/app/components/Loader';
import { Entry } from '@/app/components/Entry';
import { BarChart } from '@/app/components/BarChart';
import { NewEntryDialog } from '@/app/components/NewEntryDialog';
import { Select } from '@/app/components/Select';
import { format } from 'date-fns';

interface EntriesSummarizedReturn {
  totalIncome: number;
  totalOutcome: number;
}

interface YearItems {
  value: string;
  label: string;
}

interface ChartData {
  labels: string[];
  income: { value: number; month: string }[];
  outcome: { value: number; month: string }[];
}

const Home = () => {
  const [yearSelected, setYearSelected] = useState<string | undefined>(
    new Date().getFullYear().toString(),
  );

  const dispatch = useAppDispatch();

  const { entries } = useAppSelector((store: RootState) => store?.entry);

  const latestRegisters = sortEntries(entries?.slice(-6));

  const entriesSummarized: EntriesSummarizedReturn = entries?.reduce(
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

  const yearItems = entries?.reduce<YearItems[]>(
    (accumulator, currentEntry) => {
      const year = new Date(currentEntry?.date as string)
        .getFullYear()
        .toString();

      const yearExists = accumulator?.find(({ value }) => value === year);

      if (!yearExists) {
        accumulator?.push({ value: year, label: year });
      }

      return accumulator;
    },
    [],
  );

  const entriesFiltered = entries?.filter(({ date }) => {
    const year = new Date(date as string).getFullYear().toString();

    return year === yearSelected;
  });

  const chartData = entriesFiltered.reduce<ChartData>(
    (accumulator, currentEntry) => {
      const month = format(new Date(currentEntry.date as string), 'MMM');
      const isIncome = currentEntry?.variant === 'income';
      const currentValue = currentEntry?.valueInCents || 0;

      const monthExists = accumulator?.labels?.find(
        (monthAcc) => monthAcc === month,
      );

      if (!monthExists) {
        accumulator?.labels?.push(month);
      }

      if (isIncome) {
        accumulator?.income?.push({ value: currentValue, month });
      } else {
        accumulator?.outcome?.push({ value: currentValue, month });
      }

      return accumulator;
    },
    { labels: [], income: [], outcome: [] },
  );

  const incomes = chartData.income.reduce(
    (accumulator, currentIncome) => {
      const labelIndex = chartData?.labels.indexOf(currentIncome?.month);
      const value = currentIncome?.value / 100;

      !!accumulator[labelIndex]
        ? (accumulator[labelIndex] += value)
        : (accumulator[labelIndex] = value);

      return accumulator;
    },
    [0],
  );

  const outcomes = chartData.outcome.reduce(
    (accumulator, currentOutcome) => {
      const labelIndex = chartData?.labels.indexOf(currentOutcome?.month);
      const value = currentOutcome?.value / 100;

      !!accumulator[labelIndex]
        ? (accumulator[labelIndex] += value)
        : (accumulator[labelIndex] = value);

      return accumulator;
    },
    [0],
  );

  const result = incomes?.map((value, index) => {
    const balance = value - (outcomes[index] || 0);

    return balance;
  });

  const handleYearSelection = (value: string) => {
    setYearSelected(value);
  };

  useEffect(() => {
    if (!entries?.length) {
      dispatch(start());
    }
  }, [dispatch, entries?.length]);

  useEffect(() => {
    if (entries?.length) {
      localStorage.setItem('@finax:entries', JSON.stringify(entries));
    }
  }, [entries]);

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

              <span className="font-semibold text-gray-300/80">
                {`$ ${formatAmount(totalIncome)}`}
              </span>
            </div>

            <div className="flex w-full flex-col gap-2 rounded-md border border-gray-800 px-6 py-4">
              <div className="flex items-center justify-between">
                <p className="text-gray-400/80">Outcomes</p>
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

              <span className="font-semibold text-gray-300/80">
                {`$ ${formatAmount(balance)}`}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-5">
            <Select
              name="chart"
              variant="fit"
              items={yearItems}
              value={yearSelected}
              onValueChange={handleYearSelection}
            />

            <div className="h-64 w-full">
              <BarChart
                data={{
                  labels: chartData?.labels,
                  datasets: [
                    {
                      data: incomes,
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
                      data: outcomes,
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
                      data: result,
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
