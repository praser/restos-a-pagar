import { getYear, isBefore, isWithinInterval } from 'date-fns';
import { parseISO } from 'date-fns/esm';
import { first } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '~/components/Layout/Internal';
import {
  locksPath,
  cancellationsPath,
  joinPath,
  possibleLocksPath,
} from '~/utils/paths';
import { useApiRap } from '../../hooks';

const currYearparam = params => {
  const currYear = getYear(new Date());
  return first(params.filter(p => p.anoExecucao <= currYear));
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
  if (!params.length) return null;

  const { anoOrcamentario, dataBloqueio, dataCancelamento } = parseParam(
    currYearparam(params),
  );

  const today = new Date();
  const interval = { start: dataBloqueio, end: dataCancelamento };

  if (isBefore(today, dataBloqueio))
    return joinPath(possibleLocksPath, [anoOrcamentario]);

  if (isWithinInterval(today, interval))
    return joinPath(locksPath, [anoOrcamentario]);

  return joinPath(cancellationsPath, [anoOrcamentario]);
};

const Dashboard = () => {
  const [destiny, setDestiny] = useState();
  const apiRap = useApiRap();

  useEffect(() => {
    (async () => {
      const api = await apiRap;
      const res = await api.requests.getParams();
      setDestiny(getLink(res.data));
    })();
  }, []);

  return destiny ? <Redirect to={destiny} /> : <Layout />;
};

export default Dashboard;
