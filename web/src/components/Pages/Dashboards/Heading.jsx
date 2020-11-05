import React from 'react';

import { faDownload, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSVLink } from 'react-csv';
import { deburr, snakeCase } from 'lodash';
import { SmallButtonPrimary, SmallButtonSecondary } from '~/components/Button';
import { Heading as HeadingSC } from '~/components/Layout';
import { PageTitle } from '~/components/Tipography';
import { handleVisibility } from './RightTab/handlers';
import Can from '~/components/Can';

function Heading({ children, data, headers, setState }) {
  return (
    <HeadingSC>
      <PageTitle>{children}</PageTitle>
      <div>
        <Can
          perform="dashboardDownload:show"
          yes={() => (
            <SmallButtonPrimary
              as={CSVLink}
              data={data}
              separator=";"
              filename={snakeCase(deburr(children))}
              headers={headers}
            >
              <FontAwesomeIcon icon={faDownload} />
              Download da base csv
            </SmallButtonPrimary>
          )}
        />
        <SmallButtonSecondary onClick={() => handleVisibility(setState)}>
          <FontAwesomeIcon icon={faFilter} />
          Filtros
        </SmallButtonSecondary>
      </div>
    </HeadingSC>
  );
}

export default Heading;
