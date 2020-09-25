import React, { useState, useEffect } from 'react';
import { isToday, isPast, parseISO } from 'date-fns';
import {
  faBuilding,
  faDollarSign,
  faFileSignature,
} from '@fortawesome/free-solid-svg-icons';

import Brand from './Brand';
import Collapse from './Collapse';
import { Divider, Navbar, SectionTitle } from '~/components/Navigation/styles';

import {
  PossibleBlocksPath,
  blockedPath,
  canceledPath,
  createUgPath,
  createCommitmentPath,
  ugPath,
  joinPath,
} from '~/utils/paths';
import { getParams } from '~/utils/apiRap';

const mountCollapsables = param => {
  const blockDate = parseISO(param.dataBloqueio);
  const cancellationDate = parseISO(param.dataCancelamento);

  const collapsables = [
    {
      label: 'Prévia do bloqueio',
      to: joinPath(PossibleBlocksPath, [param.anoOrcamentario]),
    },
  ];

  const blocked = {
    label: 'Empenhos bloqueados',
    to: joinPath(blockedPath, [param.anoOrcamentario]),
  };

  const cancelled = {
    label: 'Empenhos cancelados',
    to: joinPath(canceledPath, [param.anoOrcamentario]),
  };

  if (isPast(blockDate) || isToday(blockDate)) collapsables.push(blocked);
  if (isPast(cancellationDate) || isToday(cancellationDate))
    collapsables.push(cancelled);

  return collapsables;
};

const Navigation = () => {
  const [params, setParams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getParams();
      setParams(response.data.parametros);
    };

    fetchData();
  }, []);

  return (
    <Navbar>
      <Brand />

      <Divider />

      {params.map(param => (
        <Collapse
          key={param.anoOrcamentario}
          label={`Safra ${param.anoOrcamentario}`}
          icon={faFileSignature}
          collapsables={mountCollapsables(param)}
        />
      ))}

      <Divider />

      <SectionTitle>Configuraçãoes</SectionTitle>

      <Collapse
        label="UGs"
        icon={faBuilding}
        collapsables={[
          { label: 'Listar', to: ugPath },
          { label: 'Cadastrar', to: createUgPath },
        ]}
      />

      <Collapse
        label="Saldos NE"
        icon={faDollarSign}
        collapsables={[{ label: 'Atualizar', to: createCommitmentPath }]}
      />
    </Navbar>
  );
};

export default Navigation;
