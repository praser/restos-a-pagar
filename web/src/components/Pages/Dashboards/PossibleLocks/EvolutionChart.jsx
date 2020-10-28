import React from 'react';
import { Line } from 'react-chartjs-2';
import { formatCurrencyShort } from '~/utils/numbers';
import { monthNameShort, parseISO } from '~/utils/dates';
import { layout, tooltips } from './charts';

const gridLines = {
  color: 'rgb(234, 236, 244)',
  zeroLineColor: 'rgb(234, 236, 244)',
  drawBorder: false,
  borderDash: [2],
  zeroLineBorderDash: [2],
};

const xAxes = [
  {
    time: { unit: 'date' },
    gridLines: { display: false, drawBorder: false },
    ticks: { maxTicksLimit: 7 },
  },
];

const yAxes = [
  {
    ticks: {
      maxTicksLimit: 5,
      padding: 10,
      callback: value => formatCurrencyShort(value),
    },
    gridLines,
  },
];

const options = {
  maintainAspectRatio: true,
  layout,
  scales: {
    xAxes,
    yAxes,
  },
  legend: { display: false },
  tooltips,
};

const dataset = {
  lineTension: 0.3,
  backgroundColor: 'rgba(78, 115, 223, 0.05)',
  borderColor: 'rgba(78, 115, 223, 1)',
  pointRadius: 3,
  pointBackgroundColor: 'rgba(78, 115, 223, 1)',
  pointBorderColor: 'rgba(78, 115, 223, 1)',
  pointHoverRadius: 3,
  pointHoverBackgroundColor: 'rgba(78, 115, 223, 1)',
  pointHoverBorderColor: 'rgba(78, 115, 223, 1)',
  pointHitRadius: 10,
  pointBorderWidth: 2,
};

const lineChartData = stats => {
  const data = { labels: [], datasets: [{ ...dataset, data: [] }] };
  stats.map(item => {
    data.labels.push(`${monthNameShort(parseISO(item.data))}`.toUpperCase());
    data.datasets[0].data.push(item.saldo_notas_empenho);
    return item;
  });
  return data;
};

const EvolutionChart = ({ stats }) => {
  return <Line data={lineChartData(stats)} options={options} />;
};

export default EvolutionChart;
