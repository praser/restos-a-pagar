import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { isUndefined, isNull } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsDown,
  faThumbsUp,
  faUnlock,
} from '@fortawesome/free-solid-svg-icons';
import ContextInfo from '../../../ContextInfo';
import Layout from '~/components/Layout/Internal';
import { Row } from '~/components/Layout';
import { useApiRap, useCurrentUser, useXHR } from '~/hooks';
import { locks as alertProps } from '~/utils/messages';
import { calcExecutionYear } from '../RightTab/utils';
import RightTab from '../RightTab';
import { csvHeaders, operacoesColumns } from '../utils';
import { initialState, dataInitialState } from './utils';
import { Card, CardBody, CardHeader } from '../../../Card';
import Table from '../../../Table';
import Heading from '../Heading';
import Highlights from './Highlights';
import { DoughnutChart, LineChart } from '../../../Chart';
import { lineChartData } from './lineChart';
import { Context } from '../../../Store';
import { parseISO } from '~/utils/dates';
import { primary, danger } from '~/utils/colors';
import { dougnutChartData } from './doughnutChart';
import { SmallButtonWarning } from '~/components/Button';
import Can from '~/components/Can';
import { createUnlockPath, joinPath } from '~/utils/paths';

const Locks = () => {
  const [state, setState] = useState(initialState);
  const [dataState, setDataState] = useState(dataInitialState);
  const [context] = useContext(Context);
  const { budgetYear } = useParams();
  const { physicalLotationAbbreviation } = useCurrentUser();
  const apiRap = useApiRap();
  const { tipoInfo, unidade, gestor } = state;
  const { doAllXhrRequest } = useXHR();
  const columns = [...operacoesColumns];

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
      {
        name: 'Desbloqueio solicitada',
        selector: 'desbloqueioSolicitado',
        sortable: true,
        center: true,
        format: row => (row.desbloqueioSolicitado ? thumbsUp : thumbsDown),
      },
      {
        name: 'Desbloquedo',
        selector: 'desbloqueado',
        sortable: true,
        center: true,
        format: row => (row.desbloqueado ? thumbsUp : thumbsDown),
      },
    ],
  );

  useEffect(() => {
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

      const args = {
        tipoInfo: tipoInfo.value,
        anoExecucao: calcExecutionYear(budgetYear),
        unidadeId: unidade.value || '',
        siglaGestor: gestor.value || '',
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
  }, [tipoInfo, unidade, gestor]);

  const { estatisticas, snapshots } = state;
  const { params } = context;
  const [param] = params.filter(
    item => item.anoOrcamentario === parseInt(budgetYear, 10),
  );

  const solicitarDesbloqueioButton = (
    <Can
      perform="unlock:create"
      yes={() => (
        <SmallButtonWarning
          as={Link}
          to={joinPath(createUnlockPath, [budgetYear])}
        >
          <FontAwesomeIcon icon={faUnlock} />
          Gerar lote de desbloqueio
        </SmallButtonWarning>
      )}
    />
  );

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
        buttons={[solicitarDesbloqueioButton]}
      >
        Bloqueios da safra {budgetYear} - {physicalLotationAbbreviation}
      </Heading>

      <ContextInfo tipoInfo={tipoInfo} unidade={unidade} gestor={gestor} />

      <Highlights
        estatisticas={estatisticas}
        snapshot={snapshots[0]}
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
            <DoughnutChart data={dougnutChartData(estatisticas)} />
          </CardBody>
        </Card>
      </Row>
      <Row>
        <Card>
          <CardHeader>Dados analíticos</CardHeader>
          <CardBody>
            <Table
              data={dataState.operacoes}
              columns={columns}
              pagination
              paginationComponentOptions={{
                rowsPerPageText: 'Resultados por página:',
                rangeSeparatorText: 'de',
                noRowsPerPage: false,
                selectAllRowsItem: false,
                selectAllRowsItemText: 'Todos',
              }}
              noHeader
              striped
              highlightOnHover
              noDataComponent="Ainda não tenho nada para mostrar aqui..."
            />
          </CardBody>
        </Card>
      </Row>
    </Layout>
  );
};

export default Locks;
