import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { first, isNull, isUndefined } from 'lodash';
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
import { formatDate, parseISO } from '~/utils/dates';
import Table from '~/components/Table';
import { formatPercent, formatCurrency, formatProposta } from '~/utils/numbers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { primary, danger } from '~/utils/colors';

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

  const columns = [
    { name: 'Operação', selector: 'operacao', sortable: true },
    {
      name: 'Proposta',
      selector: 'proposta',
      sortable: true,
      grow: 2,
      format: row => formatProposta(row.proposta),
    },
    { name: 'Convênio', selector: 'convenio', sortable: true },
    {
      name: 'Apta desbloqueio',
      selector: 'dataCumprimentoCriteriosDesbloqueio',
      sortable: true,
      grow: 2,
      center: true,
      format: row => {
        const thumbsUp = <FontAwesomeIcon icon={faThumbsUp} color={primary} />;
        const thumbsDown = (
          <FontAwesomeIcon icon={faThumbsDown} color={danger} />
        );
        if (isNull(row.dataCumprimentoCriteriosDesbloqueio)) return thumbsDown;
        return thumbsUp;
      },
    },
    { name: 'Ano orçamento', selector: 'anoOrcamentario', sortable: true },
    {
      name: 'Retirada da suspensiva',
      selector: 'dataRetiradaSuspensiva',
      sortable: true,
      grow: 2,
      format: row => formatDate(row.dataRetiradaSuspensiva),
    },
    { name: 'GIGOV', selector: 'gigovNome', sortable: true },
    {
      name: 'Valor repasse',
      selector: 'valorRepasse',
      sortable: true,
      format: row => formatCurrency(row.valorDesembolsado),
    },
    {
      name: 'Valor desembolsado',
      selector: 'valorDesembolsado',
      sortable: true,
      format: row => formatCurrency(row.valorDesembolsado),
    },
    {
      name: 'Proponente',
      selector: 'proponente',
      sortable: true,
      grow: 3,
      format: row => `${row.proponente}/${row.uf}`,
    },
    {
      name: 'Gestor',
      selector: 'nomeGestor',
      sortable: true,
      grow: 3,
      format: row => `${row.siglaGestor} - ${row.nomeGestor}`,
    },
    {
      name: 'Legislação',
      selector: 'enquadramentoLegislacao',
      sortable: true,
      grow: 2,
    },
    {
      name: 'Legislação complemento',
      selector: 'enquadramentoLegislacaoComplemento',
      grow: 6,
      sortable: true,
    },
    { name: 'Situação', selector: 'situacaoContrato', sortable: true, grow: 2 },
    {
      name: 'Situação complemento',
      selector: 'situacaoContratoComplemento',
      sortable: true,
      grow: 3,
    },
    {
      name: '% físico aferido',
      selector: 'percentualFisicoAferido',
      sortable: true,
      format: row => formatPercent(row.percentualFisicoAferido),
    },
    {
      name: '% financeiro desbloqueado',
      selector: 'percentualFinanceiroDesbloqueado',
      sortable: true,
      format: row => formatPercent(row.percentualFinanceiroDesbloqueado),
    },
    {
      name: 'Início vigência',
      selector: 'dataVigencia',
      sortable: true,
      grow: 2,
      format: row => formatDate(row.dataVigencia),
    },
    {
      name: 'SPA',
      selector: 'dataSPA',
      sortable: true,
      grow: 2,
      format: row => formatDate(row.dataSPA),
    },
    {
      name: 'VRPL',
      selector: 'dataVRPL',
      sortable: true,
      grow: 2,
      format: row => formatDate(row.dataVRPL),
    },
    {
      name: 'AIO',
      selector: 'dataAIO',
      sortable: true,
      grow: 2,
      format: row => formatDate(row.dataAIO),
    },
    { name: 'Objeto', selector: 'objeto', sortable: true, grow: 10 },
  ];

  return (
    <Layout>
      <RightTab visible={state.showFilters} setState={setState} />

      <Row>
        <Heading
          data={dataState.operacoesCsv}
          headers={csvHeaders}
          setState={setState}
        >
          Prévia dos bloqueios da safra {budgetYear} - {lotation}
        </Heading>
      </Row>

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

export default PossibleLocks;
