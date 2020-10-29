import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Doughnut, Line } from 'react-chartjs-2';
import ContextInfo from '../../../ContextInfo';
import Layout from '~/components/Layout/Internal';
import { Row } from '~/components/Layout';
import { useApiRap, useCurrentUser, useXHR } from '~/hooks';
import { possibleLocks as alertProps } from '~/utils/messages';
import { calcExecutionYear } from '../RightTab/utils';
import RightTab from '../RightTab';
import { initialState, dataInitialState, csvHeaders } from '../utils';
import { Card, CardBody, CardHeader } from '../../../Card';
import Table from '../../../Table';
import Heading from '../Heading';
import Highlights from './Highlights';
import EvolutionChart from './EvolutionChart';

const data = {
  labels: [
    'Sem solicitação de desbloqueio',
    'Desbloqueios solicitados',
    'Desbloqueios realizados',
  ],
  datasets: [
    {
      data: [68, 28, 12],
      backgroundColor: [
        'rgba(234, 68, 53,0.8)',
        'rgba(246, 194, 62,0.8)',
        'rgba(28, 200, 137,0.8)',
      ],
      hoverBackgroundColor: [
        'rgba(234, 68, 53,1)',
        'rgba(246, 194, 62,1)',
        'rgba(28, 200, 137,1)',
      ],
    },
  ],
};

const data2 = {
  labels: [
    '2020-01-28',
    '2020-02-28',
    '2020-03-28',
    '2020-04-28',
    '2020-05-28',
    '2020-06-28',
    '2020-07-28',
  ],
  datasets: [
    {
      label: 'Desbloqueios realizados',
      data: [0, 2, 5, 5, 10, 11, 12],
    },
    {
      label: 'Solicitações de desbloqueio',
      data: [0, 40, 42, 44, 45, 46, 40],
    },
    {
      label: 'Saldo bloquado',
      data: [100, 98, 95, 95, 90, 89, 88],
    },
  ],
};

const Locks = () => {
  const [state, setState] = useState(initialState);
  const [dataState, setDataState] = useState(dataInitialState);
  const { budgetYear } = useParams();
  const { physicalLotationAbbreviation } = useCurrentUser();
  const apiRap = useApiRap();
  const { tipoInfo, unidade, gestor } = state;
  const { doAllXhrRequest } = useXHR();

  useEffect(() => {
    apiRap.then(api => {
      const success = res => {
        const operacoes = api.formatters.operacoes(res[0].data);
        const operacoesCsv = api.formatters.operacoesCsv(res[0].data);
        setDataState(prev => ({ ...prev, operacoes, operacoesCsv }));
      };

      const requests = [
        api.requests.getOperacoesPreBloqueio({
          anoExecucao: calcExecutionYear(budgetYear),
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
      <RightTab
        budgetYear={budgetYear}
        visible={state.showFilters}
        setState={setState}
      />
      <Heading
        data={dataState.operacoesCsv}
        headers={csvHeaders}
        setState={setState}
      >
        Bloqueios da safra {budgetYear} - {physicalLotationAbbreviation}
      </Heading>

      <ContextInfo tipoInfo={tipoInfo} unidade={unidade} gestor={gestor} />

      <Highlights
        estatisticas={[
          {
            quantidadeOperacoes: 1000,
            quantidadeDocumentos: 2000,
            saldoBloqueado: 1000000000,
            saldoDesbloqueado: 500000000,
            saldoAguardandoDesbloqueio: 600000000,
          },
        ]}
        dataBloqueio={new Date(2020, 10, 14)}
        dataCancelamento={new Date(2020, 11, 31)}
      />

      <Row>
        <Card width="65%">
          <CardHeader>Saldo bloqueado X Saldo desbloqueado</CardHeader>
          <CardBody>
            <EvolutionChart stats={data2} />
          </CardBody>
        </Card>

        <Card width="33%">
          <CardHeader>Distribuição do saldo bloqueado</CardHeader>
          <CardBody>
            <Doughnut
              data={data}
              width={100}
              options={{ maintainAspectRatio: false }}
            />
          </CardBody>
        </Card>
      </Row>
      <Row>
        <Card>
          <CardHeader>Dados analíticos</CardHeader>
          <CardBody>
            <Table />
          </CardBody>
        </Card>
      </Row>
    </Layout>
  );
};

export default Locks;
