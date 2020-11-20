import { formatCurrencyShort } from '../../utils/numbers';

const layout = {
  padding: { left: 10, right: 25, top: 25, bottom: 0 },
};

const tooltips = {
  backgroundColor: 'rgb(255,255,255)',
  bodyFontColor: '#858796',
  borderColor: '#dddfeb',
  borderWidth: 1,
  callbacks: {
    label: tooltipItem => {
      return `Saldo: ${formatCurrencyShort(tooltipItem.yLabel)}`;
    },
  },
  caretPadding: 10,
  displayColors: false,
  intersect: false,
  mode: 'index',
  titleFontColor: '#6e707e',
  titleFontSize: 14,
  titleMarginBottom: 10,
  xPadding: 15,
  yPadding: 15,
};

const gridLines = {
  color: 'rgb(234, 236, 244)',
  zeroLineColor: 'rgb(234, 236, 244)',
  drawBorder: false,
  borderDash: [2],
  zeroLineBorderDash: [2],
};

const xAxes = [
  {
    gridLines: { display: false, drawBorder: false },
    ticks: { maxTicksLimit: 7 },
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
    gridLines,
  },
];

export const options = {
  maintainAspectRatio: true,
  layout,
  scales: {
    xAxes,
    yAxes,
  },
  legend: { display: false },
  tooltips,
};
