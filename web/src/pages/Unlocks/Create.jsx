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
import Layout from 'components/Layout/Internal';
import { Heading, Row } from 'components/Layout';
import { Card, CardBody, CardHeader } from 'components/Card';
import { PageTitle, Paragraph } from 'components/Tipography';
import { useApiRap, useXHR } from 'hooks';
import {
  unlocksFail,
  createUnlockError,
  createUnlockSuccess,
  promptGerarLote,
} from 'utils/messages';
import { DataTable } from 'components/Table';
import { primary, danger } from 'utils/colors';
import { formatCurrency } from 'utils/numbers';
import { formatDate, isWithinInterval, parseISO } from 'utils/dates';

import { SmallButtonPrimary, SmallButtonWarning } from 'components/Button';
import { FormRow } from 'components/Form';
import { formatNumeroLoteDesbloqueio } from 'utils/string';
import { Context } from 'components/Store';
import { Prompt } from 'components/Modal';
import Error from 'pages/Error';

const thumbsUp = <FontAwesomeIcon icon={faThumbsUp} color={primary} />;

const thumbsDown = <FontAwesomeIcon icon={faThumbsDown} color={danger} />;

const columns = [
  { name: 'Operação', selector: 'operacao', sortable: true },
  { name: 'Convênio', selector: 'convenio', sortable: true },
  {
    name: 'Apta desbloqueio',
    selector: 'aptaDesbloqueio',
    sortable: true,
    center: true,
    format: row => (row.aptaDesbloqueio ? thumbsUp : thumbsDown),
  },
  { name: 'Ano orçamento', selector: 'anoOrcamentario', sortable: true },
  { name: 'Documento', selector: 'documento', sortable: true, grow: 2 },
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
  const [context, dispatch] = useContext(Context);
  const { params } = context;
  const [param] = params.filter(
    item => item.anoOrcamentario === parseInt(budgetYear, 10),
  );

  const fetchData = useCallback(async anoOrcamentario => {
    const api = await apiRap;

    const success = res => {
      const { data } = res[0];
      setNotasEmpenho(data);
    };

    const args = {
      tipoInfo: 5,
      anoOrcamentario,
      unidadeId: '',
      siglaGestor: '',
    };

    const requests = [api.requests.getNotasEmpenhoAptasDesbloqueio(args)];

    doAllXhrRequest({
      alertProps: unlocksFail,
      requests,
      success,
    });
  }, []);

  useEffect(() => {
    fetchData(budgetYear);
  }, [budgetYear]);

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
        history.push('/temp');
        history.goBack();
      };

      const requests = [
        api.requests.postLoteDesbloqueio({
          payload: { ...notasEmpenhoSelecionadas },
        }),
      ];

      doAllXhrRequest({
        alertProps: createUnlockError,
        requests,
        success,
      });
    });
  }, [notasEmpenhoSelecionadas]);

  const handleGoBack = event => {
    event.preventDefault();
    history.goBack();
  };

  const { dataBloqueio, dataCancelamento } = param || {};
  if (param && !isWithinInterval(new Date(), dataBloqueio, dataCancelamento)) {
    return (
      <Error
        code="404"
        description="Página não encontrada"
        paragraph="Parece que você encontrou um buraco na Matrix..."
      />
    );
  }

  return (
    <Layout>
      <Prompt
        title={promptGerarLote.title}
        text={promptGerarLote.text}
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
            <DataTable
              title="Notas de empenho aptas ao desbloqueio"
              data={notasEmpenho}
              columns={columns}
              selectableRows
              selectableRowsHighlight
              contextMessage={{
                singular: 'nota de empenho',
                plural: 'notas de empenho',
                message: 'para incluir no lote',
              }}
              onSelectedRowsChange={state =>
                setNotasEmpenhoSelecionadas(state.selectedRows)
              }
              searchable
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
