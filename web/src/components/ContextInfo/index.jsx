import React, { useContext, useEffect, useState } from 'react';
import {
  faBan,
  faDatabase,
  faFilter,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import { first, isUndefined } from 'lodash';
import {
  PageContextInfo,
  PillPrimary,
  PillSuccess,
  PillWarning,
} from '~/components/Tipography';
import { useApiRap } from '~/hooks';
import { formatDate, parseISO } from '~/utils/dates';
import { Row } from '../Layout';
import { Context } from '../Store';
import Can from '../Can';

export const initialState = {
  status: {
    databasePosition: null,
  },
};

const handleSuccess = (key, res, formatter, setState) => {
  const data = {};
  data[key] = formatter(res.data);
  setState(prev => ({ ...prev, ...data }));
};

const ContextInfo = ({ tipoInfo, unidade, gestor }) => {
  const [state, setState] = useState(initialState);
  const [context] = useContext(Context);
  const { budgetYear } = useParams();
  const apiRap = useApiRap();
  const { status } = state;
  const { params } = context;
  const param = first(
    params.filter(item => item.anoOrcamentario === parseInt(budgetYear, 10)),
  );

  useEffect(() => {
    apiRap.then(api => {
      api.requests
        .getStatus()
        .then(res =>
          handleSuccess('status', res, api.formatters.status, setState),
        );
    });
  }, []);

  return (
    <Row direction="column">
      <PageContextInfo>
        <FontAwesomeIcon icon={faLock} />
        Data do bloqueio:{' '}
        {!isUndefined(param) && formatDate(parseISO(param.dataBloqueio))}
      </PageContextInfo>
      <PageContextInfo>
        <FontAwesomeIcon icon={faBan} />
        Data do cancelamento:{' '}
        {!isUndefined(param) && formatDate(parseISO(param.dataCancelamento))}
      </PageContextInfo>
      <PageContextInfo>
        <FontAwesomeIcon icon={faDatabase} />
        Posição da base de dados: {formatDate(status.databasePosition)}
      </PageContextInfo>
      <PageContextInfo>
        <FontAwesomeIcon icon={faFilter} />
        Filtros ativos:
        <Can
          perform="dashboard:filter:unidade"
          yes={() => <PillSuccess>{unidade.label}</PillSuccess>}
        />
        <Can
          perform="dashboard:filter:gestor"
          yes={() => <PillWarning>{gestor.label}</PillWarning>}
        />
        <Can
          perform="dashboard:filter:situacao"
          yes={() => <PillPrimary>{tipoInfo.label}</PillPrimary>}
        />
      </PageContextInfo>
    </Row>
  );
};

export default ContextInfo;
