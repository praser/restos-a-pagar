import React, { useEffect, useState, useCallback, useContext } from 'react';
import {
  faCheckCircle,
  faPlusCircle,
  faUnlock,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useHistory } from 'react-router-dom';
import { first, isNull, words } from 'lodash';
import {
  SmallButtonPrimary,
  SmallButtonSecondary,
  SmallButtonWarning,
} from '~/components/Button';
import Can from '~/components/Can';
import { Card, CardBody, CardHeader } from '~/components/Card';
import { Heading, Row } from '~/components/Layout';
import Layout from '~/components/Layout/Internal';
import { DataTable } from '~/components/Table';
import { PageTitle } from '~/components/Tipography';
import { useApiRap, useCurrentUser, useXHR } from '~/hooks';
import { createJudicialInjunction } from '~/utils/paths';
import {
  checkLiminarSuccess,
  createUnlockError,
  createUnlockSuccess,
  loadLiminaresFail as alertProps,
} from '~/utils/messages';
import { Prompt } from '~/components/Modal';

import { Context } from '~/components/Store';
import { formatNumeroLoteDesbloqueio } from '~/utils/string';

const List = () => {
  const apiRap = useApiRap();
  const { doAllXhrRequest } = useXHR();
  const { name: nomeUsuario } = useCurrentUser();
  const [dataState, setDataState] = useState([]);
  const [promptState, setPromptState] = useState({
    title: null,
    text: null,
    visible: false,
    confirmButtonText: null,
    handleConfirm: () => null,
  });
  const dispatch = useContext(Context)[1];
  const history = useHistory();

  const handleRequestSuccess = res => {
    const liminares = res[0].data;
    setDataState(liminares);
  };

  const handlePromptCancel = () =>
    setPromptState(prev => ({ ...prev, visible: false }));

  useEffect(() => {
    apiRap.then(api =>
      doAllXhrRequest({
        alertProps,
        requests: [api.requests.getLiminares()],
        success: handleRequestSuccess,
      }),
    );
  }, []);

  const handleCheckConfirmClick = useCallback(async liminarId => {
    setPromptState(prev => ({ ...prev, visible: false }));
    await apiRap.then(api => {
      doAllXhrRequest({
        requests: [api.requests.putLiminarCheck(liminarId)],
        success: () => {
          dispatch({
            type: 'SET_ALERT',
            payload: { ...checkLiminarSuccess, visible: true },
          });
          history.push('/temp');
          history.goBack();
        },
      });
    });
  }, []);

  const handleUnlockConfirmClick = useCallback(async payload => {
    setPromptState(prev => ({ ...prev, visible: false }));
    await apiRap.then(api => {
      doAllXhrRequest({
        alertProps: createUnlockError,
        requests: [api.requests.postLoteDesbloqueioLiminar(payload)],
        success: res => {
          const { sequencial, ano, ce, notasEmpenho: empenhos } = res[0].data;
          const args = {
            lote: formatNumeroLoteDesbloqueio(sequencial, ano),
            quantidade: empenhos.length,
            ce,
          };

          const message = createUnlockSuccess(args);
          dispatch({
            type: 'SET_ALERT',
            payload: { visible: true, ...message },
          });
          history.push('/temp');
          history.goBack();
        },
      });
    });
  }, []);

  const columns = [
    { name: 'Número do processo', selector: 'numeroProcesso', sortable: true },
    { name: 'Requerente', selector: 'requerente', sortable: true },
    { name: 'Data da decisão', selector: 'dataDecisao', sortable: true },
    { name: 'SIARG', selector: 'siarg', sortable: true },
    {
      name: 'Empenhos bloqueados',
      selector: 'empenhosBloqueados',
      sortable: true,
    },
    {
      name: 'Cadastramento',
      selector: 'responsavelCadastramentoUnidadeSigla',
      sortable: true,
    },
    {
      name: 'Ateste',
      selector: 'responsavelAtesteUnidadeSigla',
      sortable: true,
    },
    {
      name: 'Ações',
      sortable: false,
      width: '195px',
      cell: row => (
        <>
          {isNull(row.dataAteste) && (
            <Can
              perform="judicialInjunction:check"
              yes={() => (
                <SmallButtonSecondary
                  typeButton
                  onClick={() =>
                    setPromptState(prev => ({
                      ...prev,
                      visible: true,
                      confirmButtonText: 'Sim, é exatamente isso que desejo.',
                      handleConfirm: () => handleCheckConfirmClick(row.id),
                      title: 'Muita calma nessa hora!',
                      text: `${first(
                        words(nomeUsuario),
                      )}, você está realizando o ateste de uma liminar expedida no curso do processo ${
                        row.numeroProcesso
                      }. Esta ação fará com que o sistema entenda que, por força da decisão judicial, todas as notas de empenho atreladas aos contratos alcançados por ela devem ser desbloqueadas, iniciando uma rotina de acompanhamento do desbloqueio. É realmente isso que você deseja fazer?`,
                    }))
                  }
                >
                  <FontAwesomeIcon icon={faCheckCircle} />
                  Realizar ateste
                </SmallButtonSecondary>
              )}
            />
          )}
          {!isNull(row.dataAteste) && row.empenhosBloqueados > 0 && (
            <Can
              perform="unlock:create"
              yes={() => (
                <SmallButtonWarning
                  typeButton
                  onClick={() =>
                    setPromptState(prev => ({
                      ...prev,
                      visible: true,
                      title: 'Vamos gerar um lote de desbloqueio?',
                      text: `${first(
                        words(nomeUsuario),
                      )}, você está prestes a gerar um lote de desbloqueio incluindo todas as ${
                        row.empenhosBloqueados
                      } notas de empenho que possuem saldo bloqueado e que estão atreladas a liminar emitida no curso do processo ${
                        row.numeroProcesso
                      }. Deseja prosseguir?`,
                      confirmButtonText:
                        'Sim, quero gerar o lote de desbloqueio.',
                      handleConfirm: () =>
                        handleUnlockConfirmClick({ id: row.id }),
                    }))
                  }
                >
                  <FontAwesomeIcon icon={faUnlock} />
                  Pedir desbloqueio
                </SmallButtonWarning>
              )}
            />
          )}
        </>
      ),
    },
    // Operações
    // Empenhos bloqueados
  ];

  return (
    <Layout>
      <Prompt
        title={promptState.title}
        text={promptState.text}
        visible={promptState.visible}
        confirmButtonText={promptState.confirmButtonText}
        onCancel={handlePromptCancel}
        onConfirm={promptState.handleConfirm}
      />
      <Row>
        <Heading>
          <PageTitle>Liminares Judiciais</PageTitle>
          <div>
            <Can
              perform="judicialInjunction:create"
              yes={() => (
                <SmallButtonPrimary as={Link} to={createJudicialInjunction}>
                  <FontAwesomeIcon icon={faPlusCircle} />
                  Cadastrar Liminar
                </SmallButtonPrimary>
              )}
            />
          </div>
        </Heading>
      </Row>
      <Row>
        <Card>
          <CardHeader>Liminares judiciais cadastradas</CardHeader>
          <CardBody>
            <DataTable
              data={dataState}
              columns={columns}
              noHeader
              noDataText="Ainda não temos nenhuma liminar para mostrar aqui. Que tal começar cadastando uma?"
              expandableRows
              expandableRowsComponent={<p>Agora vai papai!</p>}
              expandableRowDisabled={row => row.empenhosBloqueados === 0}
            />
          </CardBody>
        </Card>
      </Row>
    </Layout>
  );
};

export default List;
