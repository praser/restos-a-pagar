import React, { useEffect, useState, useCallback } from 'react';
import {
  faEdit,
  faPlusCircle,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Button from 'components/atoms/Button';
import { Card, CardBody, CardHeader } from 'components/Card';
import { Heading, Row } from 'components/Layout';
import Layout from 'components/Layout/Internal';
import { DataTable } from 'components/Table';
import { PageTitle } from 'components/Tipography';
import { createUgPath, joinPath, updateUgPath } from 'utils/paths';
import { useApiRap, useXHR } from 'hooks';
import {
  ugsFail as alertProps,
  deleteUgFail,
  deleteUgSucces,
} from 'utils/messages';
import { Prompt } from 'components/Modal';
import Can from 'components/Can';

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
              <Button
                secondary
                small
                as={Link}
                to={joinPath(updateUgPath, [row.id])}
              >
                <FontAwesomeIcon icon={faEdit} />
                Editar
              </Button>
            )}
          />

          <Can
            perform="ugs:destroy"
            yes={() => (
              <Button
                danger
                small
                data-name={row.nome}
                data-id={row.id}
                onClick={handleDeleteClick}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
                Remover
              </Button>
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
      <Row>
        <Heading>
          <PageTitle>Unidades Gestoras</PageTitle>
          <div>
            <Can
              perform="ugs:create"
              yes={() => (
                <Button small as={Link} to={createUgPath}>
                  <FontAwesomeIcon icon={faPlusCircle} />
                  Cadastrar UG
                </Button>
              )}
            />
          </div>
        </Heading>
      </Row>
      <Row>
        <Card>
          <CardHeader>
            Lista de unidades gestoras cadastradas nos sistema
          </CardHeader>
          <CardBody>
            <DataTable data={state.ugs} columns={columns} noHeader />
          </CardBody>
        </Card>
      </Row>
    </Layout>
  );
};

export default Ugs;
