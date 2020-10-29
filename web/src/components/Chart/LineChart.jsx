import React from 'react';
import { Line } from 'react-chartjs-2';
import { options } from './utils';

const LineChart = ({ data }) => {
  const opt = { ...options };
  opt.scales.xAxes[0].time = { unit: 'date' };
  return <Line data={data} options={opt} />;
};

export default LineChart;
