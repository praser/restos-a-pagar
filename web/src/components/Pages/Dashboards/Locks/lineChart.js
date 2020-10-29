import { monthNameShort, parseISO } from '~/utils/dates';
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

export const lineChartData = stats => {
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
