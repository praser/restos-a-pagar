import React, { useEffect, useState } from 'react';
import {
  faCalendar,
  faDatabase,
  faDollarSign,
  faDownload,
  faFileContract,
  faFilter,
  faMoneyCheckAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Bar } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSVLink } from 'react-csv';
import { useParams } from 'react-router-dom';

import { SmallButtonPrimary, SmallButtonSecondary } from '~/components/Button';
import Layout from '~/components/Layout/Internal';
import { Heading, Row } from '~/components/Layout';
import {
  PageContextInfo,
  PageTitle,
  PillPrimary,
  PillSuccess,
  PillWarning,
} from '~/components/Tipography';

import { useApiRap, useCurrentUser, useXHR } from '~/hooks';

import { possibleLocks as alertProps } from '~/utils/messages';

import { handleVisibility } from './RightTab/handlers';
import { calcExecutionYear } from './RightTab/utils';
import RightTab from './RightTab';

import { initialState, dataInitialState, csvHeaders } from './utils';
import Highlight from '../Highlight';
import { Card, CardBody, CardHeader } from '../Card';
import Table from '../Table';

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

  // useEffect(() => {
  //   apiRap.then(api => {
  //     const success = res => {
  //       const operacoes = api.formatters.operacoes(res[0].data);
  //       const operacoesCsv = api.formatters.operacoesCsv(res[0].data);
  //       setDataState(prev => ({ ...prev, operacoes, operacoesCsv }));
  //     };

  //     const requests = [
  //       api.requests.getOperacoesPreBloqueio({
  //         anoExecucao: calcExecutionYear(budgetYear),
  //         tipoInfo: tipoInfo.value,
  //         unidadeId: unidade.value || '',
  //         siglaGestor: gestor.value || '',
  //       }),
  //     ];
  //     doAllXhrRequest({
  //       alertProps,
  //       requests,
  //       success,
  //     });
  //   });
  // }, [tipoInfo, unidade, gestor]);

  return (
    <Layout>
      <RightTab
        budgetYear={budgetYear}
        visible={state.showFilters}
        setState={setState}
      />
      <Heading>
        <PageTitle>
          Cancelamentos da safra {budgetYear} - {physicalLotationAbbreviation}
        </PageTitle>
        <div>
          <SmallButtonPrimary
            as={CSVLink}
            data={dataState.operacoesCsv}
            separator=";"
            filename="operacoesPassiveisBloqueio.csv"
            headers={csvHeaders}
          >
            <FontAwesomeIcon icon={faDownload} />
            Download da base csv
          </SmallButtonPrimary>
          <SmallButtonSecondary onClick={() => handleVisibility(setState)}>
            <FontAwesomeIcon icon={faFilter} />
            Filtros
          </SmallButtonSecondary>
        </div>
      </Heading>
      <Row direction="column">
        <PageContextInfo>
          <FontAwesomeIcon icon={faCalendar} />
          Data do bloqueio: 14/11/2020
        </PageContextInfo>
        <PageContextInfo>
          <FontAwesomeIcon icon={faDatabase} />
          Posição da base de dados: 14/09/2020
        </PageContextInfo>
        <PageContextInfo>
          <FontAwesomeIcon icon={faFilter} />
          Filtros ativos:
          <PillSuccess>Todas as GIGOV/REGOV</PillSuccess>
          <PillWarning>Todos os gestores</PillWarning>
          <PillPrimary>
            Operações que ainda não cumpriram os critérios de desbloqueio
          </PillPrimary>
        </PageContextInfo>
      </Row>
      <Row>
        <Highlight
          title="quantidade de operações"
          icon={faFileContract}
          siblings={3}
        >
          1.892
        </Highlight>

        <Highlight
          title="quantidade de notas de empenho"
          icon={faMoneyCheckAlt}
          variant="info"
          siblings={3}
        >
          1.941
        </Highlight>

        <Highlight
          title="Saldo cancelado"
          icon={faDollarSign}
          variant="danger"
          siblings={3}
        >
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
            <Table />
          </CardBody>
        </Card>
      </Row>
    </Layout>
  );
};

export default Cancellations;
