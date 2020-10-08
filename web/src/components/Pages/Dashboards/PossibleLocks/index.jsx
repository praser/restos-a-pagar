import React, { useEffect, useState } from 'react';
import { faDownload, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSVLink } from 'react-csv';
import { useParams } from 'react-router-dom';
import { SmallButtonPrimary, SmallButtonSecondary } from '~/components/Button';
import Layout from '~/components/Layout/Internal';
import { Row } from '~/components/Layout';
import { PageTitle } from '~/components/Tipography';
import { useApiRap, useCurrentUser, useXHR } from '~/hooks';
import { possibleLocks as alertProps } from '~/utils/messages';
import { handleVisibility } from '../RightTab/handlers';
import { calcExecutionYear } from '../RightTab/utils';
import ContextInfo from '../../../ContextInfo';
import RightTab from '../RightTab';
import { initialState, dataInitialState, csvHeaders } from '../utils';
import Heading from '../Heading';

const PossibleLocks = () => {
  const [state, setState] = useState(initialState);
  const [dataState, setDataState] = useState(dataInitialState);
  const { budgetYear } = useParams();
  const { physicalLotationAbbreviation: lotation } = useCurrentUser();
  const apiRap = useApiRap();
  const { tipoInfo, unidade, gestor } = state;
  const { doAllXhrRequest } = useXHR();

  useEffect(() => {
    apiRap.then(api => {
      const success = res => {
        const operacoes = api.formatters.operacoes(res[0].data);
        const operacoesCsv = api.formatters.operacoesCsv(res[0].data);
        const statusData = api.formatters.status(res[1].data);
        const parametrosData = api.formatters.parametros(res[2].data);
        setDataState(prev => ({ ...prev, operacoes, operacoesCsv }));
        setState(prev => ({
          ...prev,
          status: statusData,
          parametros: parametrosData,
        }));
      };

      const requests = [
        api.requests.getOperacoesPreBloqueio({
          anoExecucao: calcExecutionYear(budgetYear),
          tipoInfo: tipoInfo.value,
          unidadeId: unidade.value || '',
          siglaGestor: gestor.value || '',
        }),
        api.requests.getStatus(),
        api.requests.getParam(budgetYear),
      ];
      doAllXhrRequest({
        alertProps,
        requests,
        success,
      });
    });
  }, [tipoInfo, unidade, gestor]);

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
    </Layout>
  );
};

export default PossibleLocks;
