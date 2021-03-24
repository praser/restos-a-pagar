import React from 'react';

import { faDownload, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSVLink } from 'react-csv';
import { deburr, snakeCase } from 'lodash';
import Button from 'components/atoms/Button';
import { Heading as HeadingSC } from 'components/Layout';
import { PageTitle } from 'components/Tipography';
import { handleVisibility } from 'components/Filters/handlers';
import Can from 'components/Can';

function Heading({ children, data, headers, setState, buttons }) {
  return (
    <HeadingSC>
      <PageTitle>{children}</PageTitle>
      <div>
        {buttons && buttons.map(button => button)}
        <Can
          perform="dashboard:download"
          yes={() => (
            <Button
              small
              as={CSVLink}
              data={data}
              separator=";"
              filename={snakeCase(deburr(children))}
              headers={headers}
            >
              <FontAwesomeIcon icon={faDownload} />
              Download da base csv
            </Button>
          )}
        />
        <Can
          perform="dashboard:filter"
          yes={() => (
            <Button secondary small onClick={() => handleVisibility(setState)}>
              <FontAwesomeIcon icon={faFilter} />
              Filtros
            </Button>
          )}
        />
      </div>
    </HeadingSC>
  );
}

export default Heading;
