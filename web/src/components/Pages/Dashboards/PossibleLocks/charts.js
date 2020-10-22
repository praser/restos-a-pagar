import { formatCurrencyShort } from '../../../../utils/numbers';

export const layout = {
  padding: { left: 10, right: 25, top: 25, bottom: 0 },
};

export const tooltips = {
  backgroundColor: 'rgb(255,255,255)',
  bodyFontColor: '#858796',
  borderColor: '#dddfeb',
  borderWidth: 1,
  callbacks: tooltipItem => `Saldo: ${formatCurrencyShort(tooltipItem.yLabel)}`,
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
