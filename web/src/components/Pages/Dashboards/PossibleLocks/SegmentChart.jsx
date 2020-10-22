import React from 'react';
import { Bar } from 'react-chartjs-2';
import { formatCurrencyShort } from '~/utils/numbers';

import { layout, tooltips } from './charts';

const xAxes = [
  {
    type: 'category',
    gridLines: { display: false, drawBorder: false },
    ticks: { maxTicksLimit: 6 },
    maxBarThickness: 25,
  },
];

const yAxes = [
  {
    ticks: {
      min: 0,
      maxTicksLimit: 5,
      padding: 10,
      callback: value => formatCurrencyShort(value),
    },
    gridLines: {
      color: 'rgb(234, 236, 244)',
      zeroLineColor: 'rgb(234, 236, 244)',
      drawBorder: false,
      borderDash: [2],
      zeroLineBorderDash: [2],
    },
  },
];

const backgroundColor = [
  '#4E73DF',
  '#5B8DE3',
  '#68A5E7',
  '#75BAEA',
  '#83CDED',
  '#90DEF0',
  '#9EEDF3',
  '#ADF5F3',
  '#BBF8EF',
  '#CAFAED',
  '#D9FCEF',
];

const hoverBackgroundColor = '#2e59d9';

const borderColor = '#4e73df';

const dataset = {
  backgroundColor,
  hoverBackgroundColor,
  borderColor,
};

const datasets = [
  {
    backgroundColor,
    hoverBackgroundColor,
    borderColor,
  },
];

const options = {
  maintainAspectRatio: false,
  layout,
  scales: {
    xAxes,
    yAxes,
  },
  legend: { display: false },
  tooltips,
};

const extractData = stats => {
  const data = stats.map(item => ({
    label: item.siglaGestor,
    value: item.saldo_notas_empenho,
  }));

  return data.sort((a, b) => (a.value < b.value ? 1 : -1));
};

const barChartData = stats => {
  const labels = [];
  const data = [];

  const managers = extractData(stats);

  managers.map(item => {
    labels.push(item.label);
    data.push(item.value);
    return item;
  });

  return { labels, datasets: [{ ...dataset, data }] };
};

const SegmentChart = ({ stats }) => {
  return <Bar data={barChartData(stats)} options={options} />;
};

export default SegmentChart;
