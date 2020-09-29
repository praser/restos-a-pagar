import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faFilter } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';

import { SmallButtonPrimary, SmallButtonSecondary } from '~/components/Button';
import Layout from '~/components/Layout/Internal';
import { Heading } from '~/components/Layout';
import { PageTitle } from '~/components/Tipography';

import { useCurrentUser } from '~/hooks';
import { unidade, gestor, tipoInfo } from '~/hooks/useApiRap/defaults';

import { handleVisibility } from './RightTab/handlers';
import RightTab from './RightTab';

const initialState = {
  showFilters: false,
  unidade,
  gestor,
  tipoInfo,
};

const PossibleLocks = ({ setLoading, setAlert }) => {
  const [state, setState] = useState(initialState);
  const { budgetYear } = useParams();
  const { physicalLotationAbbreviation } = useCurrentUser();

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
          <SmallButtonPrimary>
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
