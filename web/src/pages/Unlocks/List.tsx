import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Card, CardBody, CardHeader } from 'components/Card';
import { Heading, Row } from 'components/Layout';
import Layout from 'components/Layout/Internal';
import { DataTable, IColumn } from 'components/Table';
import { PageTitle } from 'components/Tipography';
import { loadLotesDesbloqueioFail as alertProps } from 'utils/messages';
import { useApiRap, useXHR } from 'hooks';
import { formatISO, getYear } from 'utils/dates';
import Can from 'components/Can';
import { SmallButtonSecondary, SmallButtonPrimary } from 'components/Button';
import {
  createUnlockPath,
  joinPath,
  showUnlockPath,
  IUriParams,
} from 'utils/paths';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { IResponse } from 'utils/xhrClient';
import { Context } from 'components/Store';

const columns: Array<IColumn> = [
  {
    name: 'Lote',
    selector: 'sequencial',
    format: row => `${row.sequencial}/${row.ano}`,
  },
  { name: 'CE', selector: 'ce' },
  { name: 'Empenhos', selector: 'empenhos' },
  { name: 'Situação', selector: 'situacao' },
  {
    name: 'Criado em',
    selector: 'created_at',
    format: row => formatISO(row.created_at),
  },
  {
    name: 'Atualizado em',
    selector: 'updated_at',
    format: row => formatISO(row.updated_at),
  },
  { name: 'Gerado na', selector: 'responsavelUnidadeSigla' },
  { name: 'Por', selector: 'responsavelNome' },
  {
    name: 'Ações',
    cell: row => (
      <Can
        perform="unlock:show"
        yes={() => (
          <SmallButtonSecondary
            as={Link}
            to={joinPath(showUnlockPath, [row.ano, row.sequencial])}
          >
            <FontAwesomeIcon icon={faEye} /> ver lote
          </SmallButtonSecondary>
        )}
        data={[]}
      />
    ),
  },
];

const List = () => {
  const { budgetYear } = useParams<IUriParams>();
  const apiRap = useApiRap();
  const { doAllXhrRequest } = useXHR();
  const [lotesDesbloqueio, setLotesDesbloqueio] = useState([]);
  const [params] = useContext(Context)[0].params.filter(
    item => item.anoOrcamentario === parseInt(budgetYear || '', 10),
  );
  const { anoExecucao } = params || {};

  const fetchData = useCallback(async anoExecucao => {
    const api = await apiRap;

    const success = (res: Array<IResponse>) => {
      const { data } = res[0];
      setLotesDesbloqueio(data);
    };
    const requests = [api.requests.getLotesDesbloqueio(anoExecucao)];

    doAllXhrRequest({
      alertProps,
      requests,
      success,
    });
  }, []);

  useEffect(() => {
    if (anoExecucao) fetchData(anoExecucao);
  }, [anoExecucao]);

  let btnCriarLoteDesbloqueio;
  if (anoExecucao === getYear(new Date())) {
    btnCriarLoteDesbloqueio = (
      <Can
        perform="unlock:create"
        yes={() => (
          <SmallButtonPrimary
            as={Link}
            to={joinPath(createUnlockPath, [budgetYear])}
          >
            <FontAwesomeIcon icon={faPlusCircle} />
            Gerar novo lote de desbloqueio
          </SmallButtonPrimary>
        )}
        data={[]}
      />
    );
  }

  return (
    <Layout>
      <Row>
        <Heading>
          <PageTitle>Lotes de desbloqueio</PageTitle>
          {btnCriarLoteDesbloqueio}
        </Heading>
      </Row>
      <Row>
        <Card>
          <CardHeader>
            Lotes de desbloqueio gerados durante a safra {budgetYear}
          </CardHeader>
          <CardBody>
            <DataTable
              data={lotesDesbloqueio}
              columns={columns}
              searchable={false}
              noDataText="Ainda não foi gerado nenhum lote de desbloqueio. Que tal começarmos agora?"
              noHeader
            />
          </CardBody>
        </Card>
      </Row>
    </Layout>
  );
};

export default List;
