import React from 'react';
import { Line } from 'react-chartjs-2';
import { formatCurrencyShort } from '~/utils/numbers';
import { monthNameShort, parseISO } from '~/utils/dates';
import { layout, tooltips } from '../PossibleLocks/charts';

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

const datasetDef = {
  fill: true,
  lineTension: 0.3,
  pointRadius: 3,
  pointHoverRadius: 3,
  pointHitRadius: 10,
  pointBorderWidth: 2,
};

const dataDef = [
  {
    backgroundColor: 'rgba(28, 200, 137,0.2)',
    borderColor: 'rgba(28, 200, 137,1)',
    pointBorderColor: 'rgba(28, 200, 137,1)',
    pointBackgroundColor: 'rgba(28, 200, 137, 1)',
    pointHoverBackgroundColor: 'rgba(28, 200, 137,1)',
    pointHoverBorderColor: 'rgba(28, 200, 137,1)',
  },
  {
    backgroundColor: 'rgba(246, 194, 62, 0.2)',
    borderColor: 'rgba(246, 194, 62,1)',
    pointBorderColor: 'rgba(246, 194, 62,1)',
    pointBackgroundColor: 'rgba(246, 194, 62,1)',
    pointHoverBackgroundColor: 'rgba(246, 194, 62,1)',
    pointHoverBorderColor: 'rgba(246, 194, 62,1)',
  },
  {
    backgroundColor: 'rgba(234, 68, 53, 0.2)',
    borderColor: 'rgba(234, 68, 53, 1)',
    pointBorderColor: 'rgba(234, 68, 53, 1)',
    pointBackgroundColor: 'rgba(234, 68, 53, 1)',
    pointHoverBackgroundColor: 'rgba(234, 68, 53, 1)',
    pointHoverBorderColor: 'rgba(234, 68, 53, 1)',
  },
];

const lineChartData = stats => {
  const labels = stats.labels.map(item =>
    `${monthNameShort(parseISO(item))}`.toUpperCase(),
  );
  const data = { labels, datasets: [] };

  stats.datasets.map((item, index) => {
    const dataset = {
      ...datasetDef,
      ...dataDef[index],
      ...item,
    };
    data.datasets.push(dataset);
    return item;
  });
  return data;
};

const LineChart = ({ stats }) => {
  return <Line data={lineChartData(stats)} options={options} />;
};

export default LineChart;
