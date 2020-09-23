import React from 'react';
import { faFileSignature } from '@fortawesome/free-solid-svg-icons';

import Brand from './Brand';
import Collapse from './Collapse';
import { Divider, Navbar, SectionTitle } from '~/components/Navigation/styles';

const Navigation = () => {
  return (
    <Navbar>
      <Brand />
      <Collapse
        label="Safra 2017"
        icon={faFileSignature}
        collapsables={[
          { label: 'Prévia do bloqueio', to: '/safras/2017/previa-bloqueio' },
          { label: 'Empenhos bloqueados', to: '/safras/2017/bloqueios' },
          { label: 'Empenhos cancelados', to: '/safras/2017/cancelamentos' },
        ]}
      />

      <Collapse
        label="Safra 2018"
        icon={faFileSignature}
        collapsables={[
          { label: 'Prévia do bloqueio', to: '/safras/2017/previa-bloqueio' },
        ]}
      />
      <Divider />

      <SectionTitle>Configuraçãoes</SectionTitle>
    </Navbar>
  );
};

export default Navigation;
