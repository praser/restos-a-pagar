import React, { useEffect, useState } from 'react';
import { faDownload, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSVLink } from 'react-csv';
import { useParams } from 'react-router-dom';

import { SmallButtonPrimary, SmallButtonSecondary } from '~/components/Button';
import Layout from '~/components/Layout/Internal';
import { Heading } from '~/components/Layout';
import { PageTitle } from '~/components/Tipography';

import { useApiRap, useCurrentUser, useXHR } from '~/hooks';

import { possibleLocks as alertProps } from '~/utils/messages';

import { handleVisibility } from './RightTab/handlers';
import { calcExecutionYear } from './RightTab/utils';
import RightTab from './RightTab';

import { initialState, dataInitialState, csvHeaders } from './utils';

const PossibleLocks = () => {
  const [state, setState] = useState(initialState);
  const [dataState, setDataState] = useState(dataInitialState);
  const { budgetYear } = useParams();
  const { physicalLotationAbbreviation } = useCurrentUser();
  const apiRap = useApiRap();
  const { tipoInfo, unidade, gestor } = state;
  const { doAllXhrRequest } = useXHR();

  useEffect(() => {
    apiRap.then(api => {
      const success = res => {
        const operacoes = api.formatters.operacoes(res[0].data);
        const operacoesCsv = api.formatters.operacoesCsv(res[0].data);
        setDataState(prev => ({ ...prev, operacoes, operacoesCsv }));
      };

      const requests = [
        api.requests.getOperacoesPreBloqueio({
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

  return (
    <Layout>
      <RightTab
        budgetYear={budgetYear}
        visible={state.showFilters}
        setState={setState}
      />
      <Heading>
        <PageTitle>
          Gestão de possíveis bloqueios da safra {budgetYear} -{' '}
          {physicalLotationAbbreviation}
        </PageTitle>
        <div>
          <SmallButtonPrimary
            as={CSVLink}
            data={dataState.operacoesCsv}
            separator=";"
            filename="operacoesPassiveisBloqueio.csv"
            headers={csvHeaders}
          >
            <FontAwesomeIcon icon={faDownload} />
            Download da base csv
          </SmallButtonPrimary>
          <SmallButtonSecondary onClick={() => handleVisibility(setState)}>
            <FontAwesomeIcon icon={faFilter} />
            Filtros
          </SmallButtonSecondary>
        </div>
      </Heading>
    </Layout>
  );
};

export default PossibleLocks;
