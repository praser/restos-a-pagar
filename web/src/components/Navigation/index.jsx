import React from 'react';
import {
  faBuilding,
  faDollarSign,
  faFileSignature,
} from '@fortawesome/free-solid-svg-icons';

import Brand from './Brand';
import Collapse from './Collapse';
import { Divider, Navbar, SectionTitle } from '~/components/Navigation/styles';

import {
  predictedBlockPath,
  blockedPath,
  canceledPath,
  createUgPath,
  createCommitmentPath,
  ugPath,
  joinPath,
} from '~/utils/paths';

const Navigation = () => {
  return (
    <Navbar>
      <Brand />

      <Divider />

      <Collapse
        label="Safra 2017"
        icon={faFileSignature}
        collapsables={[
          {
            label: 'Prévia do bloqueio',
            to: joinPath(predictedBlockPath, [2017]),
          },
          { label: 'Empenhos bloqueados', to: joinPath(blockedPath, [2017]) },
          { label: 'Empenhos cancelados', to: joinPath(canceledPath, [2017]) },
        ]}
      />

      <Collapse
        label="Safra 2018"
        icon={faFileSignature}
        collapsables={[
          {
            label: 'Prévia do bloqueio',
            to: joinPath(predictedBlockPath, [2018]),
          },
        ]}
      />

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
