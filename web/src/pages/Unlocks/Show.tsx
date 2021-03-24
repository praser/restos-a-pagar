import React, { useCallback, useEffect, useState } from 'react';
import {
  faDownload,
  faLongArrowAltLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory, useParams } from 'react-router-dom';

import Button from 'components/atoms/Button';
import Can from 'components/Can';
import { Card, CardBody, CardHeader } from 'components/atoms/Card';
import { Heading, Row } from 'components/Layout';
import Layout from 'components/Layout/Internal';
import { DataTable, IColumn } from 'components/Table';
import { PageTitle } from 'components/Tipography';
import { useApiRap, useXHR } from 'hooks';
import { formatISO } from 'utils/dates';
import { formatCurrency } from 'utils/numbers';
import { IUriParams, joinPath, showUnlockPath } from 'utils/paths';
import { IResponse } from 'utils/xhrClient';
import { loadEmpenhosLoteDesbloqueioFail as alertProps } from 'utils/messages';
import { isEmpty } from 'utils/arrays';

const columns: Array<IColumn> = [
  { name: 'Operação', selector: 'operacao' },
  { name: 'Convênio', selector: 'convenio' },
  { name: 'Documento', selector: 'documento' },
  {
    name: 'Saldo',
    selector: 'saldo',
    format: row => formatCurrency(row.saldo),
  },
  {
    name: 'Desbloqueado',
    selector: 'desbloqueado',
    format: ({ desbloqueado }) => (desbloqueado ? 'Sim' : 'Não'),
  },
  {
    name: 'Data do desbloqueio',
    selector: 'updated_at',
    // eslint-disable-next-line camelcase
    format: ({ updated_at }) => formatISO(updated_at),
  },
];

const Show = () => {
  const { executionYear, sequence } = useParams<IUriParams>();
  const apiRap = useApiRap();
  const { doAllXhrRequest } = useXHR();
  const [empenhos, setEmpenhos] = useState([]);
  const history = useHistory();

  const handleGoBack = (event: any) => {
    event.preventDefault();
    // history.goBack();
  };

  const fetchData = useCallback(
    async (anoExecucao: string | undefined, sequencial: string | undefined) => {
      const api = await apiRap;

      const success = (res: Array<IResponse>) => {
        const { data } = res[0];
        setEmpenhos(data);
      };

      const requests = [
        api.requests.getEmpenhosLoteDesbloqueio(anoExecucao, sequencial),
      ];

      doAllXhrRequest({ alertProps, requests, success });
    },
    [],
  );

  useEffect(() => {
    fetchData(executionYear, sequence);
  }, [executionYear, sequence]);

  const downloadButton = (listaEmpenhos: any) => {
    if (!isEmpty(listaEmpenhos)) {
      const loteId = listaEmpenhos[0].loteDesbloqueioId;
      return (
        <Can
          perform="unlock:download"
          yes={() => (
            <Button
              small
              as="a"
              href={`${process.env.REACT_APP_RAP_API_URL}/lotes-desbloqueio/download?jwt=asd&loteId=${loteId}`}
            >
              <FontAwesomeIcon icon={faDownload} />
              Download do lote de desbloqueio
            </Button>
          )}
          data={[]}
        />
      );
    }
    return null;
  };

  return (
    <Layout>
      <Row>
        <Heading>
          <PageTitle>
            Lote de desbloqueio {sequence}/{executionYear}
          </PageTitle>
          {downloadButton(empenhos)}
        </Heading>
      </Row>
      <Row>
        <Card>
          <CardHeader>
            Notas de empenho do lote {sequence}/{executionYear}{' '}
          </CardHeader>
          <CardBody>
            <DataTable
              data={empenhos}
              columns={columns}
              searchable
              noHeader
              noDataText="Que estranho... Este lote de desbloqueio não deveria conter notas de empenho?"
            />
            <Button warning small onClick={handleGoBack}>
              <FontAwesomeIcon icon={faLongArrowAltLeft} />
              Voltar
            </Button>
          </CardBody>
        </Card>
      </Row>
    </Layout>
  );
};

export default Show;
