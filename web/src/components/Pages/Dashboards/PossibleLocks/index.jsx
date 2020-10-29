import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { first, isUndefined } from 'lodash';
import Layout from '~/components/Layout/Internal';
import { useApiRap, useCurrentUser, useXHR } from '~/hooks';
import { possibleLocks as alertProps } from '~/utils/messages';
import { calcExecutionYear } from '../RightTab/utils';
import ContextInfo from '../../../ContextInfo';
import RightTab from '../RightTab';
import { csvHeaders } from '../utils';
import { initialState, dataInitialState } from './utils';
import Heading from '../Heading';
import { Row } from '~/components/Layout';
import { Card, CardBody, CardHeader } from '~/components/Card';
import Highlights from './Highlights';
import { LineChart, BarChart } from '../../../Chart';
import { lineChartData } from './lineChart';
import { barChartData } from './barChart';
import { Context } from '../../../Store';
import { parseISO } from '~/utils/dates';

const PossibleLocks = () => {
  const [state, setState] = useState(initialState);
  const [dataState, setDataState] = useState(dataInitialState);
  const [context] = useContext(Context);
  const { budgetYear } = useParams();
  const { physicalLotationAbbreviation: lotation } = useCurrentUser();
  const apiRap = useApiRap();
  const { tipoInfo, unidade, gestor } = state;
  const { doAllXhrRequest } = useXHR();

  const executionYear = calcExecutionYear(budgetYear);
  const reqArgs = {
    anoExecucao: executionYear,
    tipoInfo: tipoInfo.value,
    unidadeId: unidade.value,
    siglaGestor: gestor.value,
  };

  useEffect(() => {
    apiRap.then(api => {
      const success = res => {
        const operacoes = api.formatters.operacoes(res[0].data);
        const operacoesCsv = api.formatters.operacoesCsv(res[0].data);
        const statusData = api.formatters.status(res[1].data);
        const estatisticas = res[2].data;
        setDataState(prev => ({ ...prev, operacoes, operacoesCsv }));
        setState(prev => ({
          ...prev,
          status: statusData,
          estatisticas,
        }));
      };

      const requests = [
        api.requests.getOperacoesPreBloqueio(reqArgs),
        api.requests.getStatus(),
        api.requests.getEstatisticasPreBloqueio(reqArgs),
      ];
      doAllXhrRequest({
        alertProps,
        requests,
        success,
      });
    });
  }, [tipoInfo, unidade, gestor]);

  const { params } = context;
  const param = first(
    params.filter(item => item.anoOrcamentario === parseInt(budgetYear, 10)),
  );

  const { estatisticas } = state;

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
        Prévia dos bloqueios da safra {budgetYear} - {lotation}
      </Heading>

      <ContextInfo tipoInfo={tipoInfo} unidade={unidade} gestor={gestor} />

      <Highlights
        estatisticas={estatisticas}
        dataBloqueio={!isUndefined(param) && parseISO(param.dataBloqueio)}
      />

      <Row>
        <Card width="65%">
          <CardHeader>Evolução do saldo passível de bloqueio</CardHeader>
          <CardBody>
            <LineChart data={lineChartData(estatisticas.estatisticas)} />
          </CardBody>
        </Card>
        <Card width="33%">
          <CardHeader>Saldo passível de bloqueio por gestor</CardHeader>
          <CardBody>
            <BarChart data={barChartData(estatisticas.estatisticasPorGestor)} />
          </CardBody>
        </Card>
      </Row>
      <Row>
        <Card>
          <CardHeader>Dados analíticos</CardHeader>
          <CardBody>Tabela maneira</CardBody>
        </Card>
      </Row>
    </Layout>
  );
};

export default PossibleLocks;
