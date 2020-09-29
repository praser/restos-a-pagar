import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faFilter } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { CSVLink } from 'react-csv';

import { SmallButtonPrimary, SmallButtonSecondary } from '~/components/Button';
import Layout from '~/components/Layout/Internal';
import { Heading } from '~/components/Layout';
import { PageTitle } from '~/components/Tipography';

import { useApiRap, useCurrentUser } from '~/hooks';
import {
  unidade as defUnidade,
  gestor as defGestor,
  tipoInfo as defTipoInfo,
} from '~/hooks/useApiRap/defaults';

import { possibleLocks as alertProps } from '~/utils/messages';

import { handleVisibility } from './RightTab/handlers';
import { calcExecutionYear } from './RightTab/utils';
import RightTab from './RightTab';
import { doAllXhrRequest } from '~/utils/xhr';

const initialState = {
  showFilters: false,
  unidade: defUnidade,
  gestor: defGestor,
  tipoInfo: defTipoInfo,
};

const dataInitialState = {
  operacoes: [{}],
};

const PossibleLocks = ({ setLoading, setAlert }) => {
  const [state, setState] = useState(initialState);
  const [dataState, setDataState] = useState(dataInitialState);
  const { budgetYear } = useParams();
  const { physicalLotationAbbreviation } = useCurrentUser();
  const apiRap = useApiRap();
  const { tipoInfo, unidade, gestor } = state;

  useEffect(() => {
    apiRap.then(api => {
      const success = res => {
        const operacoes = api.formatters.operacoes(res[0].data);
        setDataState(prev => ({ ...prev, operacoes }));
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
        setAlert,
        setLoading,
        success,
      });
    });
  }, [tipoInfo, unidade, gestor]);

  return (
    <Layout>
      <RightTab
        budgetYear={budgetYear}
        visible={state.showFilters}
        setAlert={setAlert}
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
            data={dataState.operacoes}
            separator=";"
            filename="operacoesPassiveisBloqueio.csv"
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
