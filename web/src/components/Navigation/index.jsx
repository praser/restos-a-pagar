import React, { useContext, useEffect } from 'react';
import { isToday, isPast, parseISO } from 'date-fns';
import {
  faBuilding,
  faDollarSign,
  faFileSignature,
  faGavel,
} from '@fortawesome/free-solid-svg-icons';

import Brand from './Brand';
import Collapse from './Collapse';
import { Content, Divider, Navbar, SectionTitle } from './styles';
import { Context } from '../Store';

import {
  possibleLocksPath,
  locksPath,
  cancellationsPath,
  createUgPath,
  updateCommitmentPath,
  ugPath,
  joinPath,
  createJudicialInjunction,
  listJudicialInjunction,
} from '~/utils/paths';
import { useApiRap } from '~/hooks';
import Can from '../Can';

const mountCollapsables = param => {
  const blockDate = parseISO(param.dataBloqueio);
  const cancellationDate = parseISO(param.dataCancelamento);

  const collapsables = [
    {
      label: 'Prévia dos bloqueios',
      to: joinPath(possibleLocksPath, [param.anoOrcamentario]),
      perform: 'dashboards:show',
    },
  ];

  const blocked = {
    label: 'Bloqueios',
    to: joinPath(locksPath, [param.anoOrcamentario]),
    perform: 'dashboards:show',
  };

  // const cancelled = {
  //   label: 'Cancelamentos',
  //   to: joinPath(cancellationsPath, [param.anoOrcamentario]),
  //   perform: 'dashboards:show',
  // };

  if (isPast(blockDate) || isToday(blockDate)) collapsables.push(blocked);
  // if (isPast(cancellationDate) || isToday(cancellationDate))
  //   collapsables.push(cancelled);

  return collapsables;
};

const Navigation = () => {
  const [context, dispatch] = useContext(Context);
  const apiRap = useApiRap();

  useEffect(() => {
    apiRap.then(api => {
      api.requests.getParams().then(res => {
        res.data.sort((a, b) =>
          a.anoOrcamentario > b.anoOrcamentario ? -1 : 1,
        );
        return dispatch({ type: 'SET_PARAMS', payload: res.data });
      });
    });
  }, []);

  const { params } = context;

  return (
    <Navbar>
      <Content>
        <Brand />

        <Divider />

        {params.map((param, i) => (
          <Can
            key={`${i * params.anoOrcamentario}`}
            perform="dashboards:show"
            yes={() => (
              <Collapse
                label={`Safra ${param.anoOrcamentario}`}
                icon={faFileSignature}
                collapsables={mountCollapsables(param)}
              />
            )}
          />
        ))}

        <Can
          perform="judicialInjunction:list"
          yes={() => (
            <Collapse
              label="Liminares Judiciais"
              icon={faGavel}
              collapsables={[
                {
                  label: 'Cadastrar',
                  to: createJudicialInjunction,
                  perform: 'judicialInjunction:create',
                },
                {
                  label: 'Listar',
                  to: listJudicialInjunction,
                  perform: 'judicialInjunction:list',
                },
              ]}
            />
          )}
        />

        <Divider />

        <SectionTitle>Configuraçãoes</SectionTitle>
        <Can
          perform="ugs:list"
          yes={() => (
            <Collapse
              label="UGs"
              icon={faBuilding}
              collapsables={[
                { label: 'Listar', to: ugPath, perform: 'ugs:list' },
                { label: 'Cadastrar', to: createUgPath, perform: 'ugs:create' },
              ]}
            />
          )}
        />

        <Can
          perform="commitment:create"
          yes={() => (
            <Collapse
              label="Saldos NE"
              icon={faDollarSign}
              collapsables={[
                {
                  label: 'Atualizar',
                  to: updateCommitmentPath,
                  perform: 'commitment:create',
                },
              ]}
            />
          )}
        />
      </Content>
    </Navbar>
  );
};

export default Navigation;
