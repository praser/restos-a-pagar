import { primary, primaryOp20 } from 'utils/colors';
import { formatDate, parseISO } from 'utils/dates';

const dataset = {
  lineTension: 0.3,
  backgroundColor: primaryOp20,
  borderColor: primary,
  pointRadius: 3,
  pointBackgroundColor: primary,
  pointBorderColor: primary,
  pointHoverRadius: 3,
  pointHoverBackgroundColor: primary,
  pointHoverBorderColor: primary,
  pointHitRadius: 10,
  pointBorderWidth: 2,
};

export const lineChartData = stats => {
  const data = { labels: [], datasets: [{ ...dataset, data: [] }] };
  stats.map(item => {
    data.labels.push(`${formatDate(parseISO(item.data))}`.toUpperCase());
    data.datasets[0].data.push(item.saldo_notas_empenho);
    data.datasets[0].label = 'Saldo sem condição de desbloqueio';
    return item;
  });
  return data;
};
