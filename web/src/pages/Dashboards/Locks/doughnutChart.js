import { isEmpty } from 'utils/arrays';

const { isAfter } = require('date-fns');
const { last } = require('lodash');
const {
  dangerOp80,
  warningOp80,
  successOp80,
  danger,
  warning,
  success,
} = require('utils/colors');

const backgroundColor = [dangerOp80, warningOp80, successOp80];
const hoverBackgroundColor = [danger, warning, success];
const labels = [
  'Sem solicitação de desbloqueio',
  'Desbloqueios solicitados',
  'Desbloqueios realizados',
];

const datasetDef = {
  labels,
  datasets: [
    {
      backgroundColor,
      hoverBackgroundColor,
    },
  ],
};

const extractData = data => {
  data.sort((a, b) => (isAfter(a.data, b.data) ? 1 : -1));
  const d = last(data);
  return [d.saldoBloqueado, d.saldoAguardandoDesbloqueio, d.saldoDesbloqueado];
};

export const dougnutChartData = data => {
  const stats = !isEmpty(data) ? extractData(data) : data;
  const dataset = { ...datasetDef };
  dataset.datasets[0].data = stats;
  return dataset;
};
