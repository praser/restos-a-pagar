import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsDown,
  faThumbsUp,
  faUnlock,
} from '@fortawesome/free-solid-svg-icons';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { isUndefined, last } from 'lodash';
import { useApiRap, useCurrentUser, useXHR } from 'hooks';
import { SmallButtonWarning } from 'components/Button';
import Can from 'components/Can';
import { Card, CardBody, CardHeader } from 'components/Card';
import { DoughnutChart, LineChart } from 'components/Chart';
import ContextInfo from 'components/ContextInfo';
import { Row } from 'components/Layout';
import { Context } from 'components/Store';
import { DataTable } from 'components/Table';
import { primary, danger } from 'utils/colors';
import { formatDate, parseISO } from 'utils/dates';
import { locks as alertProps } from 'utils/messages';
import { unlockPath, joinPath } from 'utils/paths';
import Layout from 'components/Layout/Internal';
import Filters from 'components/Filters';
import { calcExecutionYear } from 'components/Filters/utils';
import { Description } from 'pages/Error/styles';
import Placeholder from 'components/Placeholder';
import wellDoneImage from 'assets/undraw_well_done_i2wr.svg';
import { isEmpty } from 'utils/arrays';
import { csvHeaders, operacoesColumns } from '../utils';
import { initialState, dataInitialState } from './utils';
import { lineChartData } from './lineChart';
import { dougnutChartData } from './doughnutChart';
import Highlights from './Highlights';
import Heading from '../Heading';

const Locks = () => {
  const currentUser = useCurrentUser();
  const [state, setState] = useState(initialState(currentUser));
  const [dataState, setDataState] = useState(dataInitialState);
  const [context] = useContext(Context);
  const { budgetYear } = useParams();
  const { physicalLotationAbbreviation } = currentUser;
  const apiRap = useApiRap();
  const { tipoInfo, unidade, gestor } = state;
  const { doAllXhrRequest } = useXHR();
  const columns = [...operacoesColumns];
  const { status } = context;

  const thumbsUp = <FontAwesomeIcon icon={faThumbsUp} color={primary} />;
  const thumbsDown = <FontAwesomeIcon icon={faThumbsDown} color={danger} />;
  columns.splice(
    3,
    0,
    ...[
      {
        name: 'Apta desbloqueio',
        selector: 'aptaDesbloqueio',
        sortable: true,
        center: true,
        format: row => (row.aptaDesbloqueio ? thumbsUp : thumbsDown),
      },
    ],
  );

  const fectchData = useCallback(async args => {
    apiRap.then(api => {
      const success = res => {
        const { estatisticas } = res[0].data;
        const { estatisticas: snapshots } = res[1].data;
        const operacoes = api.formatters.operacoes(res[2].data);
        const operacoesCsv = api.formatters.operacoesCsv(res[2].data);
        setDataState(prev => ({ ...prev, operacoes, operacoesCsv }));
        setState(prev => ({
          ...prev,
          estatisticas: api.formatters.estatisticasBloqueio(estatisticas),
          snapshots: api.formatters.estatisticasBloqueio(snapshots),
        }));
      };

      const requests = [
        api.requests.getEstatisticasBloqueio(args),
        api.requests.getEstatisticasBloqueioSnapshot(args),
        api.requests.getOperacoesBloqueio(args),
      ];

      doAllXhrRequest({
        alertProps,
        requests,
        success,
      });
    });
  }, []);

  useEffect(() => {
    const args = {
      tipoInfo: tipoInfo.value,
      anoExecucao: calcExecutionYear(budgetYear),
      unidadeId: unidade.value || '',
      siglaGestor: gestor.value || '',
    };

    fectchData(args);
  }, [tipoInfo, unidade, gestor, budgetYear]);

  const { estatisticas, snapshots } = state;
  const { params } = context;
  const [param] = params.filter(
    item => item.anoOrcamentario === parseInt(budgetYear, 10),
  );

  const solicitarDesbloqueioButton = (
    <Can
      key={1}
      perform="unlock:create"
      yes={() => (
        <SmallButtonWarning as={Link} to={joinPath(unlockPath, [budgetYear])}>
          <FontAwesomeIcon icon={faUnlock} />
          Lotes de desbloqueio
        </SmallButtonWarning>
      )}
    />
  );

  return (
    <Layout>
      {!isEmpty(state.estatisticas) ? (
        <>
          <Filters
            budgetYear={budgetYear}
            visible={state.showFilters}
            setState={setState}
          />
          <Heading
            data={dataState.operacoesCsv}
            headers={csvHeaders}
            setState={setState}
            buttons={[solicitarDesbloqueioButton]}
          >
            Bloqueios da safra {budgetYear} - {physicalLotationAbbreviation}
          </Heading>

          <ContextInfo
            tipoInfo={tipoInfo}
            unidade={unidade}
            gestor={gestor}
            status={status}
          />

          <Highlights
            estatisticas={estatisticas}
            snapshot={last(snapshots)}
            dataBloqueio={!isUndefined(param) && parseISO(param.dataBloqueio)}
            dataCancelamento={
              !isUndefined(param) && parseISO(param.dataCancelamento)
            }
            posicaoBase={status.databasePosition}
          />

          <Row>
            <Card width="65%">
              <CardHeader>Saldo bloqueado X Saldo desbloqueado</CardHeader>
              <CardBody>
                <LineChart data={lineChartData(estatisticas)} />
              </CardBody>
            </Card>

            <Card width="33%">
              <CardHeader>{`Distribuição do saldo bloqueado em ${formatDate(
                status.databasePosition,
              )}`}</CardHeader>
              <CardBody>
                <DoughnutChart data={dougnutChartData(estatisticas)} />
              </CardBody>
            </Card>
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
        </>
      ) : (
        <Placeholder src={wellDoneImage}>
          <Description
            style={{ marginTop: '30px' }}
          >{`Bom trabalho! Você não tem nenhuma operação para se preocupar durante
            o ciclo de bloqueio do RAP deste ano. Pode comemorar.`}</Description>
        </Placeholder>
      )}
    </Layout>
  );
};

export default Locks;
