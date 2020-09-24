import React, { useState, useEffect } from 'react';
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
          label={`Safra ${param.anoOrcamentario}`}
          icon={faFileSignature}
          collapsables={[
            {
              label: 'Prévia do bloqueio',
              to: joinPath(PossibleBlocksPath, [param.anoOrcamentario]),
            },
            {
              label: 'Empenhos bloqueados',
              to: joinPath(blockedPath, [param.anoOrcamentario]),
            },
            {
              label: 'Empenhos cancelados',
              to: joinPath(canceledPath, [param.anoOrcamentario]),
            },
          ]}
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
