import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = ({ data }) => {
  const opt = {
    maintainAspectRatio: false,
    legend: { display: false },
  };

  return <Doughnut data={data} width={100} options={opt} />;
};

export default DoughnutChart;
