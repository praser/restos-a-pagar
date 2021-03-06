import {
  faDollarSign,
  faFileContract,
  faMoneyCheckAlt,
} from '@fortawesome/free-solid-svg-icons';

import React, { useContext, useEffect, useState } from 'react';

import { Bar } from 'react-chartjs-2';

import { useParams } from 'react-router-dom';

import { Card, CardBody, CardHeader } from 'components/Card';

import { useApiRap, useCurrentUser, useXHR } from 'hooks';
import ContextInfo from 'components/ContextInfo';
import Highlight from 'components/Highlight';
import { Row } from 'components/Layout';
import { Context } from 'components/Store';
import { DataTable } from 'components/Table';
import { possibleLocks as alertProps } from 'utils/messages';
import Layout from 'components/Layout/Internal';
import Filters from 'components/Filters';
import Heading from '../Heading';
import { csvHeaders } from '../utils';
import { initialState, dataInitialState } from './utils';

const data = {
  labels: ['MDR', 'MTUR', 'MC', 'MAPA', 'MJS', 'Outros'],
  datasets: [
    {
      label: 'Saldo Passível de bloqueio',
      backgroundColor: 'rgba(28, 200, 137,0.2)',
      borderColor: 'rgba(28, 200, 137,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(28, 200, 137,0.4)',
      hoverBorderColor: 'rgba(28, 200, 137,1)',
      data: [60, 46, 19, 15, 5, 0.2],
    },
    {
      label: 'Saldo bloqueado',
      backgroundColor: 'rgba(246, 194, 62,0.2)',
      borderColor: 'rgba(246, 194, 62,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(246, 194, 62,0.4)',
      hoverBorderColor: 'rgba(246, 194, 62,1)',
      data: [56, 43, 17, 9, 2, 0.1],
    },
    {
      label: 'Saldo cancelado',
      backgroundColor: 'rgba(234, 68, 53,0.2)',
      borderColor: 'rgba(234, 68, 53,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(234, 68, 53,0.4)',
      hoverBorderColor: 'rgba(234, 68, 53,1)',
      data: [20, 14, 7, 3, 0.4, 0.1],
    },
  ],
};

const Cancellations = () => {
  const [state, setState] = useState(initialState);
  const [dataState, setDataState] = useState(dataInitialState);
  const { budgetYear } = useParams();
  const { physicalLotationAbbreviation } = useCurrentUser();
  const apiRap = useApiRap();
  const { tipoInfo, unidade, gestor } = state;
  const { doAllXhrRequest } = useXHR();
  const [context] = useContext(Context);
  const { status, params } = context;
  const [param] = params.filter(
    item => item.anoOrcamentario === parseInt(budgetYear, 10),
  );
  const { anoExecucao } = param || {};

  useEffect(() => {
    apiRap.then(api => {
      const success = res => {
        const operacoes = api.formatters.operacoes(res[0].data);
        const operacoesCsv = api.formatters.operacoesCsv(res[0].data);
        setDataState(prev => ({ ...prev, operacoes, operacoesCsv }));
      };

      const requests = [
        api.requests.getOperacoesPreBloqueio({
          anoExecucao,
          tipoInfo: tipoInfo.value,
          unidadeId: unidade.value || '',
          siglaGestor: gestor.value || '',
        }),
      ];
      doAllXhrRequest({
        alertProps,
        requests,
        success,
      });
    });
  }, [tipoInfo, unidade, gestor]);

  return (
    <Layout>
      <Filters
        budgetYear={budgetYear}
        visible={state.showFilters}
        setState={setState}
      />

      <Row>
        <Heading
          data={dataState.operacoesCsv}
          headers={csvHeaders}
          setState={setState}
        >
          Cancelamentos da safra {budgetYear} - {physicalLotationAbbreviation}
        </Heading>
      </Row>

      <ContextInfo
        tipoInfo={tipoInfo}
        unidade={unidade}
        gestor={gestor}
        status={status}
      />

      <Row>
        <Highlight title="quantidade de operações" icon={faFileContract}>
          1.892
        </Highlight>

        <Highlight
          title="quantidade de notas de empenho"
          icon={faMoneyCheckAlt}
          variant="info"
        >
          1.941
        </Highlight>

        <Highlight title="Saldo cancelado" icon={faDollarSign} variant="danger">
          R$ 1.49 bilhões
        </Highlight>
      </Row>

      <Row>
        <Card>
          <CardHeader>Distribuição do saldo cancelado por gestor</CardHeader>
          <CardBody>
            <Bar
              data={data}
              width={100}
              height={300}
              options={{
                maintainAspectRatio: false,
              }}
            />
          </CardBody>
        </Card>
      </Row>
      <Row>
        <Card>
          <CardHeader>Dados analíticos</CardHeader>
          <CardBody>
            <DataTable />
          </CardBody>
        </Card>
      </Row>
    </Layout>
  );
};

export default Cancellations;
