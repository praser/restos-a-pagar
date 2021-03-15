import React, { useCallback, useEffect, useState } from 'react';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useParams } from 'react-router-dom';

import { SmallButtonPrimary } from 'components/Button';
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

  return (
    <Layout>
      <Row>
        <Heading>
          <PageTitle>
            Lote de desbloqueio {sequence}/{executionYear}
          </PageTitle>
          <Can
            perform="unlock:download"
            yes={() => (
              <SmallButtonPrimary
                as={Link}
                to={joinPath(showUnlockPath, [2020, 1])}
              >
                <FontAwesomeIcon icon={faDownload} />
                Download do lote de desbloqueio
              </SmallButtonPrimary>
            )}
            data={[]}
          />
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
          </CardBody>
        </Card>
      </Row>
    </Layout>
  );
};

export default Show;
