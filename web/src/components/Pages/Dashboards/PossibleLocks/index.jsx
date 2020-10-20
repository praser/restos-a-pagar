import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { faFileContract } from '@fortawesome/free-solid-svg-icons';
import Layout from '~/components/Layout/Internal';
import { useApiRap, useCurrentUser, useXHR } from '~/hooks';
import { possibleLocks as alertProps } from '~/utils/messages';
import { calcExecutionYear } from '../RightTab/utils';
import ContextInfo from '../../../ContextInfo';
import RightTab from '../RightTab';
import { initialState, dataInitialState, csvHeaders } from '../utils';
import Heading from '../Heading';
import { Row } from '~/components/Layout';
import Highlight from '~/components/Highlight';
import { formatCurrencyShort, formatInteger } from '~/utils/numbers';
import Progressbar from '~/components/Progressbar';
import {
  monthNameShort,
  percentElapsedTime,
  remainingDays,
  parseISO,
} from '~/utils/dates';
import { Card, CardBody, CardHeader } from '~/components/Card';
import { Line, defaults } from 'react-chartjs-2';
import { last } from 'lodash';
defaults.global.defaultFontFamily =
  'Nunito, -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
defaults.global.defaultFontColor = '#858796';

const PossibleLocks = () => {
  const [state, setState] = useState(initialState);
  const [dataState, setDataState] = useState(dataInitialState);
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
        const parametrosData = api.formatters.parametros(res[2].data);
        const estatisticas = res[3].data;
        setDataState(prev => ({ ...prev, operacoes, operacoesCsv }));
        setState(prev => ({
          ...prev,
          status: statusData,
          parametros: parametrosData,
          estatisticas,
        }));
      };

      const requests = [
        api.requests.getOperacoesPreBloqueio(reqArgs),
        api.requests.getStatus(),
        api.requests.getParam(budgetYear),
        api.requests.getEstatisticas(reqArgs),
      ];
      doAllXhrRequest({
        alertProps,
        requests,
        success,
      });
    });
  }, [tipoInfo, unidade, gestor]);

  const {
    quantidade_operacoes: countOperacoes,
    quantidade_notas_empenho: countEmpenhos,
    saldo_notas_empenho: balanceEmpenhos,
  } = last(state.estatisticas.estatisticas);

  const lineChartData = () => {
    const { estatisticas } = state.estatisticas;
    const dataset = {
      lineTension: 0.3,
      backgroundColor: 'rgba(78, 115, 223, 0.05)',
      borderColor: 'rgba(78, 115, 223, 1)',
      pointRadius: 3,
      pointBackgroundColor: 'rgba(78, 115, 223, 1)',
      pointBorderColor: 'rgba(78, 115, 223, 1)',
      pointHoverRadius: 3,
      pointHoverBackgroundColor: 'rgba(78, 115, 223, 1)',
      pointHoverBorderColor: 'rgba(78, 115, 223, 1)',
      pointHitRadius: 10,
      pointBorderWidth: 2,
    };
    const data = { labels: [], datasets: [{ ...dataset, data: [] }] };
    estatisticas.map(item => {
      data.labels.push(`${monthNameShort(parseISO(item.data))}`.toUpperCase());
      data.datasets[0].data.push(item.saldo_notas_empenho);
    });
    return data;
  };

  const { dataBloqueio } = state.parametros;

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

      <Row>
        <Highlight
          icon={faFileContract}
          siblings={4}
          title="Quantidade de operações"
        >
          {formatInteger(countOperacoes)}
        </Highlight>
        <Highlight
          icon={faFileContract}
          siblings={4}
          title="Quantidade de notas de empenho"
          variant="success"
        >
          {formatInteger(countEmpenhos)}
        </Highlight>
        <Highlight
          icon={faFileContract}
          siblings={4}
          title="Saldo passível de bloqueio"
          variant="info"
        >
          {formatCurrencyShort(balanceEmpenhos)}
        </Highlight>
        <Highlight
          icon={faFileContract}
          siblings={4}
          title="Dias até o bloqueio"
          variant="warning"
        >
          <div style={{ display: 'flex' }}>
            {remainingDays(dataBloqueio)}{' '}
            <Progressbar
              width={`${percentElapsedTime(dataBloqueio)}%`}
              variant="warning"
            />
          </div>
        </Highlight>
      </Row>
      <Row>
        <Card width="65%">
          <CardHeader>Evolução do saldo passível de bloqueio</CardHeader>
          <CardBody>
            <Line
              data={lineChartData()}
              options={{
                maintainAspectRatio: true,
                layout: {
                  padding: {
                    left: 10,
                    right: 25,
                    top: 25,
                    bottom: 0,
                  },
                },
                scales: {
                  xAxes: [
                    {
                      time: {
                        unit: 'date',
                      },
                      gridLines: {
                        display: false,
                        drawBorder: false,
                      },
                      ticks: {
                        maxTicksLimit: 7,
                      },
                    },
                  ],
                  yAxes: [
                    {
                      ticks: {
                        maxTicksLimit: 5,
                        padding: 10,
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values) {
                          return formatCurrencyShort(value);
                        },
                      },
                      gridLines: {
                        color: 'rgb(234, 236, 244)',
                        zeroLineColor: 'rgb(234, 236, 244)',
                        drawBorder: false,
                        borderDash: [2],
                        zeroLineBorderDash: [2],
                      },
                    },
                  ],
                },
                legend: {
                  display: false,
                },
                tooltips: {
                  backgroundColor: 'rgb(255,255,255)',
                  bodyFontColor: '#858796',
                  titleMarginBottom: 10,
                  titleFontColor: '#6e707e',
                  titleFontSize: 14,
                  borderColor: '#dddfeb',
                  borderWidth: 1,
                  xPadding: 15,
                  yPadding: 15,
                  displayColors: false,
                  intersect: false,
                  mode: 'index',
                  caretPadding: 10,
                  callbacks: {
                    label: function (tooltipItem, chart) {
                      return `Saldo: ${formatCurrencyShort(
                        tooltipItem.yLabel,
                      )}`;
                    },
                  },
                },
              }}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Saldo passível de bloqueio por gestor</CardHeader>
          <CardBody>Um belo gráfico aqui</CardBody>
        </Card>
      </Row>
    </Layout>
  );
};

export default PossibleLocks;
