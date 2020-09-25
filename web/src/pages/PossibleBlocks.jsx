import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faFilter } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { SmallButtonPrimary, SmallButtonSecondary } from '~/components/Button';

import Layout from '~/components/Layout/Internal';
import { Heading } from '~/components/Layout';
import { PageTitle } from '~/components/Tipography';
import { useCurrentUser } from '~/utils/user';

const PossibleBlocks = () => {
  const { budgetYear } = useParams();
  const { physicalLotationAbbreviation } = useCurrentUser();

  return (
    <Layout>
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
          <SmallButtonSecondary>
            <FontAwesomeIcon icon={faFilter} />
            Filtros
          </SmallButtonSecondary>
        </div>
      </Heading>
    </Layout>
  );
};

export default PossibleBlocks;
