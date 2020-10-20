import React from 'react';
import { Line } from 'react-chartjs-2';
import { formatCurrencyShort } from '~/utils/numbers';
import { monthNameShort, parseISO } from '~/utils/dates';

const layout = {
  padding: { left: 10, right: 25, top: 25, bottom: 0 },
};

const xAxes = [
  {
    time: { unit: 'date' },
    gridLines: { display: false, drawBorder: false },
    ticks: { maxTicksLimit: 7 },
  },
];

const gridLines = {
  color: 'rgb(234, 236, 244)',
  zeroLineColor: 'rgb(234, 236, 244)',
  drawBorder: false,
  borderDash: [2],
  zeroLineBorderDash: [2],
};

const yAxes = [
  {
    ticks: {
      maxTicksLimit: 5,
      padding: 10,
      callback: function (value) {
        return formatCurrencyShort(value);
      },
    },
    gridLines,
  },
];

const tooltips = {
  backgroundColor: 'rgb(255,255,255)',
  bodyFontColor: '#858796',
  titleMarginBottom: 10,
  titleFontColor: '#6e707e',
  titleFontSize: 14,
  borderColor: '#dddfeb',
  borderWidth: 1,
  xPadding: 15,
  yPadding: 15,
  displayColors: false,
  intersect: false,
  mode: 'index',
  caretPadding: 10,
  callbacks: {
    label: function (tooltipItem) {
      return `Saldo: ${formatCurrencyShort(tooltipItem.yLabel)}`;
    },
  },
};

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

const lineChartData = estatisticas => {
  const data = { labels: [], datasets: [{ ...dataset, data: [] }] };
  estatisticas.map(item => {
    data.labels.push(`${monthNameShort(parseISO(item.data))}`.toUpperCase());
    data.datasets[0].data.push(item.saldo_notas_empenho);
  });
  return data;
};

const EvolutionChart = ({ estatisticas }) => {
  return <Line data={lineChartData(estatisticas)} options={options} />;
};

export default EvolutionChart;
