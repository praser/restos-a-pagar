import React, { useCallback, useEffect, useState } from 'react';
import {
  faDownload,
  faLongArrowAltLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useHistory, useParams } from 'react-router-dom';

import { SmallButtonPrimary, SmallButtonWarning } from 'components/Button';
import Can from 'components/Can';
import { Card, CardBody, CardHeader } from 'components/Card';
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
  const [loteDesbloqueio, setLoteDesbloqueio] = useState(null);
  const history = useHistory();

  const handleGoBack = (event: any) => {
    event.preventDefault();
    history.goBack();
  };

  const fetchData = useCallback(
    async (anoExecucao: string | undefined, sequencial: string | undefined) => {
      const api = await apiRap;

      const success = (res: Array<IResponse>) => {
        const { data: empenhosData } = res[0];
        const { data: loteDesbloqueioData } = res[1];
        setEmpenhos(empenhosData);
        setLoteDesbloqueio(loteDesbloqueioData);
      };

      const requests = [
        api.requests.getEmpenhosLoteDesbloqueio(anoExecucao, sequencial),
        api.requests.getLoteDesbloqueio(anoExecucao, sequencial),
      ];

      doAllXhrRequest({ alertProps, requests, success });
    },
    [],
  );

  useEffect(() => {
    fetchData(executionYear, sequence);
  }, [executionYear, sequence]);

  const downloadButton = (loteDesbloqueio: any) => {
    if (loteDesbloqueio) {
      if (loteDesbloqueio.filePath) {
        return (
          <Can
            perform="unlock:download"
            yes={() => (
              <SmallButtonPrimary
                as="a"
                href={`${process.env.REACT_APP_RAP_API_URL}/lotes-desbloqueio/download?jwt=asd&loteId=${loteDesbloqueio.id}`}
              >
                <FontAwesomeIcon icon={faDownload} />
                Download do lote de desbloqueio
              </SmallButtonPrimary>
            )}
            data={[]}
          />
        );
      }
      return null;
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
          {downloadButton(loteDesbloqueio)}
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
            <SmallButtonWarning onClick={handleGoBack}>
              <FontAwesomeIcon icon={faLongArrowAltLeft} />
              Voltar
            </SmallButtonWarning>
          </CardBody>
        </Card>
      </Row>
    </Layout>
  );
};

export default Show;
