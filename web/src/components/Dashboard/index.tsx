import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import Layout from '~/components/Layout/Internal';

import IProps from './IProps';
import { getLink } from './utils';

const Dashboard = (props: IProps) => {
  const [destiny, setDestiny] = useState<string | null>();

  useEffect(() => {
    const link = getLink(props);
    setDestiny(link);
  }, [setDestiny, getLink, props]);

  return destiny ? (
    <Redirect to={destiny} />
  ) : (
    <Layout>
      <></>
    </Layout>
  );
};

export default Dashboard;
