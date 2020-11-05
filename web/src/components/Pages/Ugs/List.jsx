import React, { useEffect, useState, useCallback } from 'react';
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
} from '../../Button';
import { Card, CardBody, CardHeader } from '../../Card';
import { Heading } from '../../Layout';
import Layout from '../../Layout/Internal';
import Table from '../../Table';
import { PageTitle } from '../../Tipography';
import { createUgPath, joinPath, updateUgPath } from '~/utils/paths';
import { useApiRap, useXHR } from '~/hooks';
import {
  ugsFail as alertProps,
  deleteUgFail,
  deleteUgSucces,
} from '~/utils/messages';
import { Prompt } from '../../Modal';
import Can from '~/components/Can';

const initialState = {
  ugs: [],
  prompt: { title: 'Opa!', text: '', visible: false },
  currentUgId: null,
};

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

  const handleDeleteClick = event => {
    event.preventDefault();
    const name = event.target.getAttribute('data-name');
    const currentUgId = event.target.getAttribute('data-id');
    const { title } = state.prompt;
    const text = `Tem certeza de que deseja apagar a UG ${name}?`;
    const prompt = { title, text, visible: true };
    setState(prev => ({ ...prev, prompt, currentUgId }));
  };

  const handleDeleteSuccess = () => {
    const { title, text } = deleteUgSucces;
    const prompt = { title, text, visible: true };
    setState(prev => ({ ...prev, prompt }));
  };

  const sendRequest = useCallback(async ugId => {
    await apiRap.then(api => {
      doAllXhrRequest({
        deleteUgFail,
        requests: [api.requests.deleteUg(ugId)],
        success: handleDeleteSuccess,
      });
    });
  }, []);

  const closePrompt = () => {
    const { title, text } = state.prompt;
    setState(prev => ({ ...prev, prompt: { title, text, visbile: false } }));
  };

  const handlePromptConfirm = event => {
    event.preventDefault();
    closePrompt();
    sendRequest(state.currentUgId);
  };

  const handlePromptCancel = () => {
    closePrompt();
  };

  const columns = [
    { name: 'Código', selector: 'codigo', sortable: true, width: '80px' },
    { name: 'Nome', selector: 'nome', sortable: true },
    { name: 'Sigla', selector: 'siglaGestor', sortable: true, width: '80px' },
    { name: 'Gestor', selector: 'nomeGestor', sortable: true },
    {
      name: 'Ações',
      sortable: false,
      width: '220px',
      cell: row => (
        <>
          <Can
            perform="ugs:update"
            yes={() => (
              <SmallButtonSecondary
                as={Link}
                to={joinPath(updateUgPath, [row.id])}
              >
                <FontAwesomeIcon icon={faEdit} />
                Editar
              </SmallButtonSecondary>
            )}
          />

          <Can
            perform="ugs:destroy"
            yes={() => (
              <SmallButtonDanger
                data-name={row.nome}
                data-id={row.id}
                onClick={handleDeleteClick}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
                Remover
              </SmallButtonDanger>
            )}
          />
        </>
      ),
    },
  ];

  return (
    <Layout>
      <Prompt
        title={state.prompt.title}
        text={state.prompt.text}
        visible={state.prompt.visible}
        onCancel={handlePromptCancel}
        onConfirm={handlePromptConfirm}
      />
      <Heading>
        <PageTitle>Unidades Gestoras</PageTitle>
        <div>
          <Can
            perform="ugs:create"
            yes={() => (
              <SmallButtonPrimary as={Link} to={createUgPath}>
                <FontAwesomeIcon icon={faPlusCircle} />
                Cadastrar UG
              </SmallButtonPrimary>
            )}
          />
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
