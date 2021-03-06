import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { isNull, isUndefined } from 'lodash';
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

import Filters from 'components/Filters';

import { LineChart, BarChart } from 'components/Chart';
import ContextInfo from 'components/ContextInfo';
import { Context } from 'components/Store';
import { isEmpty } from 'utils/arrays';
import Placeholder from 'components/Placeholder';

import wellDoneImage from 'assets/undraw_well_done_i2wr.svg';
import { Description } from 'pages/Error/styles';
import Heading from '../Heading';
import { csvHeaders, operacoesColumns } from '../utils';
import { lineChartData } from './lineChart';
import { initialState, dataInitialState } from './utils';
import Highlights from './Highlights';
import { barChartData } from './barChart';

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
  const { status, params } = context;
  const [param] = params.filter(
    item => item.anoOrcamentario === parseInt(budgetYear, 10),
  );
  const { anoExecucao } = param || {};

  const reqArgs = {
    anoExecucao,
    tipoInfo: tipoInfo.value,
    unidadeId: unidade.value,
    siglaGestor: gestor.value,
  };

  const fetchData = useCallback(async args => {
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
        api.requests.getOperacoesPreBloqueio(args),
        api.requests.getEstatisticasPreBloqueio(args),
      ];
      doAllXhrRequest({
        alertProps,
        requests,
        success,
      });
    });
  }, []);

  useEffect(() => {
    if (anoExecucao) fetchData(reqArgs);
  }, [tipoInfo, unidade, gestor, anoExecucao]);

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
      {!isEmpty(state.estatisticas.estatisticas) ? (
        <>
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
            tipoInfo={tipoInfo}
          />

          <Row>
            <Card width="65%">
              <CardHeader>
                Evolução do saldo sem condição de desbloqueio
              </CardHeader>
              <CardBody />
              <LineChart data={lineChartData(estatisticas.estatisticas)} />
            </Card>

            {estatisticas.estatisticasPorGestor && (
              <Card width="33%">
                <CardHeader>
                  Saldo sem condição de desbloqueio por gestor
                </CardHeader>
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
              <CardHeader>Operações sem condição de desbloqueio</CardHeader>
              <CardBody>
                <DataTable
                  data={dataState.operacoes}
                  columns={columns}
                  noHeader
                  searchable
                  noDataText="Não existem operações que possuam saldo sem condição de desbloqueio"
                />
              </CardBody>
            </Card>
          </Row>
        </>
      ) : (
        <Placeholder src={wellDoneImage}>
          <Description style={{ marginTop: '30px' }}>
            {`Bom trabalho! Você não tem nenhuma operação para se preocupar durante
            o ciclo de pré-bloqueio do RAP ${anoExecucao}. Pode comemorar.`}
          </Description>
        </Placeholder>
      )}
    </Layout>
  );
};

export default PossibleLocks;
