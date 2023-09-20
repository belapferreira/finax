import { ComponentProps, ComponentRef, forwardRef } from 'react';

import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip);

type BarChartProps = ComponentProps<typeof Bar>;

export const BarChart = forwardRef<ComponentRef<typeof Bar>, BarChartProps>(
  (props, forwardedRef) => {
    const { data, ...rest } = props;

    const options: Partial<ChartOptions<'bar'>> = {
      maintainAspectRatio: false,
      scales: {
        y: {
          border: {
            color: '#1f2937',
          },
          ticks: {
            color: '#6b7280',
          },
          grid: {
            color: '#1f2937',
          },
        },
        x: {
          border: {
            color: '#1f2937',
          },
          ticks: {
            color: '#9ca3af',
          },
          grid: {
            color: 'transparent',
          },
        },
      },
    };

    return <Bar ref={forwardedRef} data={data} options={options} {...rest} />;
  },
);

BarChart.displayName = 'BarChart';
