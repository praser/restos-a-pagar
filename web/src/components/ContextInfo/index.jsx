import React, { useContext } from 'react';

import {
  faBan,
  faDatabase,
  faFilter,
  faLock,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useParams } from 'react-router-dom';

import { first, isUndefined } from 'lodash';

import { formatDate, parseISO } from 'utils/dates';

import {
  PageContextInfo,
  PillPrimary,
  PillSuccess,
  PillWarning,
} from '../Tipography';
import { Row } from '../Layout';
import { Context } from '../Store';
import Can from '../Can';

export const initialState = {
  status: {
    databasePosition: null,
  },
};

const ContextInfo = ({ tipoInfo, unidade, gestor, status }) => {
  const [context] = useContext(Context);
  const { budgetYear } = useParams();
  const { params } = context;
  const param = first(
    params.filter(item => item.anoOrcamentario === parseInt(budgetYear, 10)),
  );

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
