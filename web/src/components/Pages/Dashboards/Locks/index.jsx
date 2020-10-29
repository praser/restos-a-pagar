import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { isUndefined } from 'lodash';
import ContextInfo from '../../../ContextInfo';
import Layout from '~/components/Layout/Internal';
import { Row } from '~/components/Layout';
import { useApiRap, useCurrentUser, useXHR } from '~/hooks';
import { locks as alertProps } from '~/utils/messages';
import { calcExecutionYear } from '../RightTab/utils';
import RightTab from '../RightTab';
import { csvHeaders } from '../utils';
import { initialState } from './utils';
import { Card, CardBody, CardHeader } from '../../../Card';
import Table from '../../../Table';
import Heading from '../Heading';
import Highlights from './Highlights';
import { DoughnutChart, LineChart } from '../../../Chart';
import { lineChartData } from './lineChart';
import { Context } from '../../../Store';
import { parseISO } from '~/utils/dates';

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

const Locks = () => {
  const [state, setState] = useState(initialState);
  const [context] = useContext(Context);
  const { budgetYear } = useParams();
  const { physicalLotationAbbreviation } = useCurrentUser();
  const apiRap = useApiRap();
  const { tipoInfo, unidade, gestor } = state;
  const { doAllXhrRequest } = useXHR();

  useEffect(() => {
    apiRap.then(api => {
      const success = res => {
        const { estatisticas } = res[0].data;
        setState(prev => ({
          ...prev,
          estatisticas: api.formatters.estatisticasBloqueio(estatisticas),
        }));
      };

      const requests = [
        api.requests.getEstatisticasBloqueio({
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

  const { estatisticas } = state;
  const { params } = context;
  const [param] = params.filter(
    item => item.anoOrcamentario === parseInt(budgetYear, 10),
  );

  return (
    <Layout>
      <RightTab
        budgetYear={budgetYear}
        visible={state.showFilters}
        setState={setState}
      />
      <Heading
        // data={dataState.operacoesCsv}
        data={[[]]}
        headers={csvHeaders}
        setState={setState}
      >
        Bloqueios da safra {budgetYear} - {physicalLotationAbbreviation}
      </Heading>

      <ContextInfo tipoInfo={tipoInfo} unidade={unidade} gestor={gestor} />

      <Highlights
        estatisticas={estatisticas}
        dataBloqueio={!isUndefined(param) && parseISO(param.dataBloqueio)}
        dataCancelamento={
          !isUndefined(param) && parseISO(param.dataCancelamento)
        }
      />

      <Row>
        <Card width="65%">
          <CardHeader>Saldo bloqueado X Saldo desbloqueado</CardHeader>
          <CardBody>
            <LineChart data={lineChartData(estatisticas)} />
          </CardBody>
        </Card>

        <Card width="33%">
          <CardHeader>Distribuição do saldo bloqueado</CardHeader>
          <CardBody>
            <DoughnutChart data={data} />
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
