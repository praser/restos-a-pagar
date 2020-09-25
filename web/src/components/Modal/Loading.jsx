import React from 'react';
import Layout from './Layout';
import { ProgressBar } from './styles';

const Loading = ({ visible, title }) => {
  return <Layout visible={visible} title={title} text={<ProgressBar />} />;
};

export default Loading;
