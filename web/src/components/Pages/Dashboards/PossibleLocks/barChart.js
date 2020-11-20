import {
  primaryScale as backgroundColor,
  primary as hoverBackgroundColor,
  primaryOp80 as borderColor,
} from '~/utils/colors';

const dataset = {
  backgroundColor,
  hoverBackgroundColor,
  borderColor,
};

const extractData = stats => {
  const data = stats.map(item => ({
    label: item.siglaGestor,
    value: item.saldo_notas_empenho,
  }));

  return data.sort((a, b) => (a.value < b.value ? 1 : -1));
};

export const barChartData = stats => {
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
