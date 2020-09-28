import { getYear, isBefore, isWithinInterval } from 'date-fns';
import { parseISO } from 'date-fns/esm';
import { first } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '~/components/Layout/Internal';
import {
  blockedPath,
  canceledPath,
  joinPath,
  possibleLocksPath,
} from '~/utils/paths';
import { useApiRap } from '../hooks';

const currYearparam = params => {
  const currYear = getYear(new Date());
  return first(params.filter(p => p.anoExecucao === currYear));
};

const parseParam = param => {
  const {
    anoExecucao,
    anoOrcamentario,
    dataBloqueio,
    dataCancelamento,
  } = param;

  return {
    anoExecucao,
    anoOrcamentario,
    dataBloqueio: parseISO(dataBloqueio),
    dataCancelamento: parseISO(dataCancelamento),
  };
};

const getLink = params => {
  if (!params.length) return;

  const { anoOrcamentario, dataBloqueio, dataCancelamento } = parseParam(
    currYearparam(params),
  );

  const today = new Date();
  const interval = { start: dataBloqueio, end: dataCancelamento };

  if (isBefore(today, dataBloqueio)) {
    return joinPath(possibleLocksPath, [anoOrcamentario]);
  } else if (isWithinInterval(today, interval)) {
    return joinPath(blockedPath, [anoOrcamentario]);
  }

  return joinPath(canceledPath, [anoOrcamentario]);
};

const Dashboard = () => {
  const [destiny, setDestiny] = useState();
  const apiRap = useApiRap();

  useEffect(() => {
    apiRap.then(api => {
      api.getParams().then(res => setDestiny(getLink(res.data.parametros)));
      console.log(destiny);
    });
  }, []);

  return destiny ? <Redirect to={destiny} /> : <Layout />;
};

export default Dashboard;
