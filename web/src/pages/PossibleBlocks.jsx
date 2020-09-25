import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faFilter } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { SmallButtonPrimary, SmallButtonSecondary } from '~/components/Button';

import Layout from '~/components/Layout/Internal';
import { Heading } from '~/components/Layout';
import { PageTitle } from '~/components/Tipography';
import { useCurrentUser } from '~/utils/user';
import RightTab from '~/components/Modal/RightTab';

const PossibleBlocks = () => {
  const { budgetYear } = useParams();
  const [showFilters, setShowFilters] = useState(false);
  const { physicalLotationAbbreviation } = useCurrentUser();

  const handleFilter = event => {
    event.preventDefault();
    setShowFilters(prev => !prev);
  };

  return (
    <Layout>
      <RightTab visible={showFilters} title="Filtros" onClose={handleFilter} />
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
          <SmallButtonSecondary onClick={handleFilter}>
            <FontAwesomeIcon icon={faFilter} />
            Filtros
          </SmallButtonSecondary>
        </div>
      </Heading>
    </Layout>
  );
};

export default PossibleBlocks;
