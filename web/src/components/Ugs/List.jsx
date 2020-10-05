import React, { useEffect, useState } from 'react';
import {
  faEdit,
  faPlusCircle,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
  SmallButtonDanger,
  SmallButtonPrimary,
  SmallButtonSecondary,
} from '~/components/Button';
import { Card, CardBody, CardHeader } from '~/components/Card';
import { Heading } from '~/components/Layout';
import Layout from '~/components/Layout/Internal';
import Table from '~/components/Table';
import { PageTitle } from '~/components/Tipography';
import { createUgPath } from '~/utils/paths';
import { useApiRap, useXHR } from '~/hooks';
import { ugsFail as alertProps } from '~/utils/messages';

const initialState = { ugs: [] };
const columns = [
  { name: 'Código', selector: 'codigo', sortable: true, width: '80px' },
  { name: 'Nome', selector: 'nome', sortable: true },
  { name: 'Sigla', selector: 'siglaGestor', sortable: true, width: '80px' },
  { name: 'Gestor', selector: 'nomeGestor', sortable: true },
  {
    name: 'Ações',
    sortable: false,
    width: '220px',
    cell: () => (
      <>
        <SmallButtonSecondary>
          <FontAwesomeIcon icon={faEdit} />
          Editar
        </SmallButtonSecondary>
        <SmallButtonDanger>
          <FontAwesomeIcon icon={faTrashAlt} />
          Remover
        </SmallButtonDanger>
      </>
    ),
  },
];

const Ugs = () => {
  const apiRap = useApiRap();
  const [state, setState] = useState(initialState);
  const { doAllXhrRequest } = useXHR();

  useEffect(() => {
    apiRap.then(api => {
      const success = res => {
        const ugs = res[0].data.ug;
        setState(prev => ({ ...prev, ugs }));
      };

      const requests = [api.requests.getUgs()];

      doAllXhrRequest({
        alertProps,
        requests,
        success,
      });
    });
  }, []);

  return (
    <Layout>
      <Heading>
        <PageTitle>Unidades Gestoras</PageTitle>
        <div>
          <SmallButtonPrimary as={Link} to={createUgPath}>
            <FontAwesomeIcon icon={faPlusCircle} />
            Cadastrar UG
          </SmallButtonPrimary>
        </div>
      </Heading>
      <Card>
        <CardHeader>
          Lista de unidades gestoras cadastradas nos sistema
        </CardHeader>
        <CardBody>
          <Table
            data={state.ugs}
            columns={columns}
            pagination
            paginationComponentOptions={{
              rowsPerPageText: 'Resultados por página:',
              rangeSeparatorText: 'de',
              noRowsPerPage: false,
              selectAllRowsItem: false,
              selectAllRowsItemText: 'Todos',
            }}
            noHeader
            striped
            highlightOnHover
            noDataComponent="Ainda não tenho nada para mostrar aqui..."
          />
        </CardBody>
      </Card>
    </Layout>
  );
};

export default Ugs;
