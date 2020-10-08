import React, { useEffect, useState } from 'react';
import {
  faCalendar,
  faCalendarAlt,
  faDatabase,
  faDownload,
  faFileContract,
  faFilter,
  faHourglassHalf,
  faLock,
  faLockOpen,
  faMoneyCheckAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSVLink } from 'react-csv';
import { useParams } from 'react-router-dom';
import { Doughnut, Line } from 'react-chartjs-2';

import { SmallButtonPrimary, SmallButtonSecondary } from '~/components/Button';
import ContextInfo from '../../../ContextInfo';
import Layout from '~/components/Layout/Internal';
import { Row } from '~/components/Layout';
import {
  PageContextInfo,
  PageTitle,
  PillPrimary,
  PillSuccess,
  PillWarning,
} from '~/components/Tipography';

import { useApiRap, useCurrentUser, useXHR } from '~/hooks';

import { possibleLocks as alertProps } from '~/utils/messages';

import { handleVisibility } from '../RightTab/handlers';
import { calcExecutionYear } from '../RightTab/utils';
import RightTab from '../RightTab';

import { initialState, dataInitialState, csvHeaders } from '../utils';
import Highlight from '../../../Highlight';
import Progressbar from '../../../Progressbar';
import { Card, CardBody, CardHeader } from '../../../Card';
import Table from '../../../Table';
import Heading from '../Heading';

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
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Desbloqueios realizados',
      fill: true,
      lineTension: 0.1,
      backgroundColor: 'rgba(28, 200, 137,0.4)',
      borderColor: 'rgba(28, 200, 137,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(28, 200, 137,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(28, 200, 137,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [0, 2, 5, 5, 10, 11, 12],
    },
    {
      label: 'Solicitações de desbloqueio',
      fill: true,
      lineTension: 0.1,
      backgroundColor: 'rgba(246, 194, 62, 0.4)',
      borderColor: 'rgba(246, 194, 62,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(246, 194, 62,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(246, 194, 62,0.4)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [0, 40, 42, 44, 45, 46, 40],
    },
    {
      label: 'Saldo bloquado',
      fill: true,
      lineTension: 0.1,
      backgroundColor: 'rgba(234, 68, 53, 0.4)',
      borderColor: 'rgba(234, 68, 53,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(234, 68, 53,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(234, 68, 53,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
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
      <Heading
        data={dataState.operacoesCsv}
        headers={csvHeaders}
        setState={setState}
      >
        Bloqueios da safra {budgetYear} - {physicalLotationAbbreviation}
      </Heading>
      <ContextInfo tipoInfo={tipoInfo} unidade={unidade} gestor={gestor} />
      <Row>
        <Highlight
          icon={faFileContract}
          siblings={3}
          title="quantidade de operações"
        >
          1.892
        </Highlight>

        <Highlight
          icon={faMoneyCheckAlt}
          siblings={3}
          title=" quantidade de notas de empenho"
          variant="info"
        >
          1.941
        </Highlight>

        <Highlight
          icon={faCalendarAlt}
          siblings={3}
          title="dias até o cancelamento"
          variant="warning"
        >
          <div style={{ display: 'flex' }}>
            45 <Progressbar width="5%" variant="warning" />
          </div>
        </Highlight>
      </Row>
      <Row>
        <Highlight
          icon={faLock}
          siblings={3}
          title="Saldo bloqueado"
          variant="danger"
        >
          R$ 1.49 bilhões
        </Highlight>

        <Highlight
          icon={faLockOpen}
          siblings={3}
          title="Saldo desbloqueado"
          variant="success"
        >
          R$ 1.49 bilhões
        </Highlight>

        <Highlight
          icon={faHourglassHalf}
          siblings={3}
          title="Saldo agaurdando desbloqueio"
          variant="warning"
        >
          R$ 1.49 bilhões
        </Highlight>
      </Row>
      <Row>
        <Card width="65%">
          <CardHeader>Saldo bloqueado X Saldo desbloqueado</CardHeader>
          <CardBody>
            <Line data={data2} />
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
