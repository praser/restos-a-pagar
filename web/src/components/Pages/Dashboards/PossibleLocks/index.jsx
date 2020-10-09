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
import { percentElapsedTime, remainingDays } from '~/utils/dates';

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
  } = state.estatisticas.estatisticas[0];

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
    </Layout>
  );
};

export default PossibleLocks;
