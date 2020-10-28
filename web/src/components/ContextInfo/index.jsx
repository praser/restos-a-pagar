import React, { useEffect, useState } from 'react';
import {
  faBan,
  faDatabase,
  faFilter,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import {
  PageContextInfo,
  PillPrimary,
  PillSuccess,
  PillWarning,
} from '~/components/Tipography';
import { useApiRap } from '~/hooks';
import { formatDate } from '~/utils/dates';
import { Row } from '../Layout';

export const initialState = {
  status: {
    databasePosition: null,
  },
  parametros: {
    dataBloqueio: null,
  },
};

const handleSuccess = (key, res, formatter, setState) => {
  const data = {};
  data[key] = formatter(res.data);
  setState(prev => ({ ...prev, ...data }));
};

const ContextInfo = ({ tipoInfo, unidade, gestor }) => {
  const [state, setState] = useState(initialState);
  const { budgetYear } = useParams();
  const apiRap = useApiRap();
  const { status, parametros } = state;

  useEffect(() => {
    apiRap.then(api => {
      api.requests
        .getStatus()
        .then(res =>
          handleSuccess('status', res, api.formatters.status, setState),
        );
      api.requests
        .getParam(budgetYear)
        .then(res =>
          handleSuccess('parametros', res, api.formatters.parametros, setState),
        );
    });
  }, []);

  return (
    <Row direction="column">
      <PageContextInfo>
        <FontAwesomeIcon icon={faLock} />
        Data do bloqueio: {formatDate(parametros.dataBloqueio)}
      </PageContextInfo>
      <PageContextInfo>
        <FontAwesomeIcon icon={faBan} />
        Data do cancelamento: {formatDate(parametros.dataCancelamento)}
      </PageContextInfo>
      <PageContextInfo>
        <FontAwesomeIcon icon={faDatabase} />
        Posição da base de dados: {formatDate(status.databasePosition)}
      </PageContextInfo>
      <PageContextInfo>
        <FontAwesomeIcon icon={faFilter} />
        Filtros ativos:
        <PillSuccess>{unidade.label}</PillSuccess>
        <PillWarning>{gestor.label}</PillWarning>
        <PillPrimary>{tipoInfo.label}</PillPrimary>
      </PageContextInfo>
    </Row>
  );
};

export default ContextInfo;
