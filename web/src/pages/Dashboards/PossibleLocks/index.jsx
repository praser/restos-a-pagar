import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { first, isNull, isUndefined } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

import { Card, CardBody, CardHeader } from 'components/Card';
import { Row } from 'components/Layout';
import Layout from 'components/Layout/Internal';
import { DataTable } from 'components/Table';
import { useApiRap, useCurrentUser, useXHR } from 'hooks';
import { primary, danger } from 'utils/colors';
import { parseISO } from 'utils/dates';
import { possibleLocks as alertProps } from 'utils/messages';

import { barChartData } from './barChart';
import Highlights from './Highlights';
import { initialState, dataInitialState } from './utils';
import { lineChartData } from './lineChart';

import Heading from '../Heading';
import Filters from 'components/Filters';
import { calcExecutionYear } from 'components/Filters/utils';
import { csvHeaders, operacoesColumns } from '../utils';

import { LineChart, BarChart } from 'components/Chart';
import ContextInfo from 'components/ContextInfo';
import { Context } from 'components/Store';

const PossibleLocks = () => {
  const currentUser = useCurrentUser();
  const [state, setState] = useState(initialState(currentUser));
  const [dataState, setDataState] = useState(dataInitialState);
  const [context] = useContext(Context);
  const { budgetYear } = useParams();
  const { physicalLotationAbbreviation: lotation } = useCurrentUser();
  const apiRap = useApiRap();
  const { tipoInfo, unidade, gestor } = state;
  const { doAllXhrRequest } = useXHR();
  const { status } = context;

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
        const estatisticas = res[1].data;
        setDataState(prev => ({ ...prev, operacoes, operacoesCsv }));
        setState(prev => ({
          ...prev,
          estatisticas,
        }));
      };

      const requests = [
        api.requests.getOperacoesPreBloqueio(reqArgs),
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

  const columns = [...operacoesColumns];
  columns.splice(3, 0, {
    name: 'Apta desbloqueio',
    selector: 'dataCumprimentoCriteriosDesbloqueio',
    sortable: true,
    grow: 2,
    center: true,
    format: row => {
      const thumbsUp = <FontAwesomeIcon icon={faThumbsUp} color={primary} />;
      const thumbsDown = <FontAwesomeIcon icon={faThumbsDown} color={danger} />;
      if (isNull(row.dataCumprimentoCriteriosDesbloqueio)) return thumbsDown;
      return thumbsUp;
    },
  });

  return (
    <Layout>
      <Filters visible={state.showFilters} setState={setState} />

      <Row>
        <Heading
          data={dataState.operacoesCsv}
          headers={csvHeaders}
          setState={setState}
        >
          Prévia dos bloqueios da safra {budgetYear} - {lotation}
        </Heading>
      </Row>

      <ContextInfo
        tipoInfo={tipoInfo}
        unidade={unidade}
        gestor={gestor}
        status={status}
      />

      <Highlights
        estatisticas={estatisticas}
        dataBloqueio={!isUndefined(param) && parseISO(param.dataBloqueio)}
      />

      <Row>
        <Card width={estatisticas.estatisticasPorGestor ? '65%' : '100%'}>
          <CardHeader>Evolução do saldo passível de bloqueio</CardHeader>
          <CardBody />
          <LineChart data={lineChartData(estatisticas.estatisticas)} />
        </Card>

        {estatisticas.estatisticasPorGestor && (
          <Card width="33%">
            <CardHeader>Saldo passível de bloqueio por gestor</CardHeader>
            <CardBody>
              <BarChart
                data={barChartData(estatisticas.estatisticasPorGestor)}
              />
            </CardBody>
          </Card>
        )}
      </Row>
      <Row>
        <Card>
          <CardHeader>Dados analíticos</CardHeader>
          <CardBody>
            <DataTable
              data={dataState.operacoes}
              columns={columns}
              noHeader
              searchable
            />
          </CardBody>
        </Card>
      </Row>
    </Layout>
  );
};

export default PossibleLocks;
