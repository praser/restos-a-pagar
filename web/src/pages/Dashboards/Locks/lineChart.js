import { isAfter } from 'date-fns';
import { formatDate } from '~/utils/dates';
import { formatCurrency } from '~/utils/numbers';
import { options } from '~/components/Chart/utils';
import {
  danger,
  dangerOp20,
  success,
  successOp20,
  warning,
  warningOp20,
} from '~/utils/colors';

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
    backgroundColor: successOp20,
    borderColor: success,
    pointBorderColor: success,
    pointBackgroundColor: success,
    pointHoverBackgroundColor: success,
    pointHoverBorderColor: success,
  },
  {
    backgroundColor: warningOp20,
    borderColor: warning,
    pointBorderColor: warning,
    pointBackgroundColor: warning,
    pointHoverBackgroundColor: warning,
    pointHoverBorderColor: warning,
  },
  {
    backgroundColor: dangerOp20,
    borderColor: danger,
    pointBorderColor: danger,
    pointBackgroundColor: danger,
    pointHoverBackgroundColor: danger,
    pointHoverBorderColor: danger,
  },
];

const extractData = data => {
  const labels = [];
  const saldoDesbloqueado = [];
  const saldoAguardandoDesbloqueio = [];
  const saldoBloqueado = [];

  data.sort((a, b) => (isAfter(a.data, b.data) ? 1 : -1));
  data.map(item => {
    labels.push(item.data);
    saldoDesbloqueado.push(item.saldoDesbloqueado);
    saldoAguardandoDesbloqueio.push(item.saldoAguardandoDesbloqueio);
    saldoBloqueado.push(item.saldoBloqueado);
    return item;
  });

  return {
    labels,
    datasets: [
      {
        label: 'Desbloqueios realizados',
        data: saldoDesbloqueado,
      },
      {
        label: 'Solicitações de desbloqueio',
        data: saldoAguardandoDesbloqueio,
      },
      {
        label: 'Saldo bloqueado',
        data: saldoBloqueado,
      },
    ],
  };
};

const lineChartOptions = { ...options };

lineChartOptions.tooltips.callbacks.label = (tooltipItem, data) =>
  `${data.datasets[tooltipItem.datasetIndex].label}: ${formatCurrency(
    tooltipItem.yLabel,
  )}`;

lineChartOptions.scales.xAxes[0].ticks.display = false;

export const lineChartData = data => {
  const stats = extractData(data);
  const labels = stats.labels.map(item => `${formatDate(item)}`.toUpperCase());
  const dataArray = { labels, datasets: [] };

  stats.datasets.map((item, index) => {
    const dataset = {
      ...datasetDef,
      ...dataDef[index],
      ...item,
    };
    dataArray.datasets.push(dataset);
    return item;
  });
  return dataArray;
};

export { lineChartOptions };
