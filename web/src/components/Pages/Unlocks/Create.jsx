import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLongArrowAltLeft,
  faSave,
  faThumbsDown,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import { isEmpty } from 'lodash';
import Layout from '../../Layout/Internal';
import { Heading, Row } from '../../Layout';
import { Card, CardBody, CardHeader } from '../../Card';
import { PageTitle, Paragraph } from '../../Tipography';
import { useApiRap, useXHR } from '~/hooks';
import {
  unlocksFail,
  createUnlockError,
  createUnlockSuccess,
} from '~/utils/messages';
import { calcExecutionYear } from '../Dashboards/RightTab/utils';
import Table from '~/components/Table';
import { primary, danger } from '~/utils/colors';
import { formatCurrency, formatProposta } from '~/utils/numbers';
import { formatDate, parseISO } from '~/utils/dates';

import { SmallButtonPrimary, SmallButtonWarning } from '~/components/Button';
import { FormRow } from '~/components/Form';
import { formatNumeroLoteDesbloqueio } from '~/utils/string';
import { Context } from '~/components/Store';
import { Prompt } from '~/components/Modal';

const Create = () => {
  const { budgetYear } = useParams();
  const apiRap = useApiRap();
  const [notasEmpenho, setNotasEmpenho] = useState([
    { aptaDesbloqueio: false, desbloqueioSolicitado: false },
  ]);
  const [notasEmpenhoSelecionadas, setNotasEmpenhoSelecionadas] = useState([]);
  const [isPromptShowing, setIsPromptShowing] = useState(false);
  const { doAllXhrRequest } = useXHR();
  const history = useHistory();
  const dispatch = useContext(Context)[1];

  const thumbsUp = <FontAwesomeIcon icon={faThumbsUp} color={primary} />;
  const thumbsDown = <FontAwesomeIcon icon={faThumbsDown} color={danger} />;
  const columns = [
    { name: 'Operação', selector: 'operacao', sortable: true },
    {
      name: 'Proposta',
      selector: 'proposta',
      sortable: true,
      grow: 2,
      format: row => formatProposta(row.proposta),
    },
    { name: 'Convênio', selector: 'convenio', sortable: true },
    {
      name: 'Apta desbloqueio',
      selector: 'aptaDesbloqueio',
      sortable: true,
      center: true,
      format: row => (row.aptaDesbloqueio ? thumbsUp : thumbsDown),
    },
    { name: 'Ano orçamento', selector: 'anoOrcamentario', sortable: true },
    { name: 'Documento', selector: 'documento', sortable: true },
    {
      name: 'Data emissão',
      selector: 'dataEmissao',
      sortable: true,
      grow: 2,
      format: row => formatDate(parseISO(row.dataEmissao)),
    },
    {
      name: 'Saldo a ser desbloqueado',
      selector: 'saldoContaContabil',
      sortable: true,
      grow: 2,
      format: row => formatCurrency(row.saldoContaContabil),
    },
  ];

  useEffect(() => {
    apiRap.then(api => {
      const success = res => {
        const { data } = res[0];
        setNotasEmpenho(data);
      };

      const args = {
        tipoInfo: 5,
        anoOrcamentario: budgetYear,
        unidadeId: '',
        siglaGestor: '',
      };

      const requests = [api.requests.getNotasEmpenhoAptasDesbloqueio(args)];

      doAllXhrRequest({
        alertProps: unlocksFail,
        requests,
        success,
      });
    });
  }, []);

  const handleSubmit = useCallback(() => {
    apiRap.then(api => {
      setIsPromptShowing(false);
      const success = res => {
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
      };
      const requests = [
        api.requests.postLoteDesbloqueio({
          payload: { notasEmpenho: notasEmpenhoSelecionadas },
        }),
      ];
      doAllXhrRequest({
        alertProps: createUnlockError,
        requests,
        success,
      });
    });
  }, []);

  const handleGoBack = event => {
    event.preventDefault();
    history.goBack();
  };

  return (
    <Layout>
      <Prompt
        title="Tem certeza?"
        text="Esta ação não poderá ser desfeita e gererá uma CE solicitando que a área financeira faça o desbloqueio das notas de empenho selecionadas. Deseja prosseguir?"
        onConfirm={handleSubmit}
        onCancel={() => setIsPromptShowing(false)}
        visible={isPromptShowing}
      />
      <Row>
        <Heading>
          <PageTitle>Criar lote de desbloqueio da safra {budgetYear}</PageTitle>
        </Heading>
      </Row>
      <Row>
        <Card>
          <CardHeader>Notas de empenho aptas ao desbloqueio</CardHeader>
          <CardBody>
            <Paragraph>
              Estas são notas de empenho que estão aptas ao desbloqueio no
              momento. Selecione na lista abaxo àquelas que deseja incluir neste
              lote.
            </Paragraph>
            <Table
              title="Notas de empenho aptas ao desbloqueio"
              data={notasEmpenho}
              columns={columns}
              pagination
              paginationComponentOptions={{
                rowsPerPageText: 'Resultados por página:',
                rangeSeparatorText: 'de',
                noRowsPerPage: false,
                selectAllRowsItem: false,
                selectAllRowsItemText: 'Todos',
              }}
              striped
              selectableRows
              selectableRowsHighlight
              highlightOnHover
              noDataComponent="Ainda não tenho nada para mostrar aqui..."
              contextMessage={{
                singular: 'nota de empenho',
                plural: 'notas de emepenho',
                message: 'para incluir no lote',
              }}
              onSelectedRowsChange={state =>
                setNotasEmpenhoSelecionadas(state.selectedRows)
              }
            />
            <FormRow>
              <SmallButtonPrimary
                type="button"
                disabled={isEmpty(notasEmpenhoSelecionadas)}
                onClick={() => setIsPromptShowing(true)}
              >
                <FontAwesomeIcon icon={faSave} />
                Salvar
              </SmallButtonPrimary>
              <SmallButtonWarning onClick={handleGoBack}>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
                Voltar
              </SmallButtonWarning>
            </FormRow>
          </CardBody>
        </Card>
      </Row>
    </Layout>
  );
};

export default Create;
