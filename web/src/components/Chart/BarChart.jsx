import React from 'react';
import { Bar } from 'react-chartjs-2';
import { options } from './utils';

const BarChart = ({ data }) => {
  const opt = { ...options };
  opt.scales.xAxes[0].type = 'category';
  opt.maintainAspectRatio = false;
  return <Bar data={data} options={opt} />;
};

export default BarChart;
