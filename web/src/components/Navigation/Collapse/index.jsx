import React, { useState } from 'react';
import Can from '~/components/Can';

import {
  Collapsable,
  Collapse as CollapseContainer,
  Collapselink,
  Icon,
  Navitem,
  Navlink,
  NavlinkText,
} from './styles';

const Collapse = ({ label, icon, collapsables }) => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = event => {
    event.preventDefault();
    setExpanded(prev => !prev);
  };

  return (
    <Navitem>
      <Navlink expanded={expanded} onClick={handleClick}>
        <Icon icon={icon} />
        <NavlinkText>{label}</NavlinkText>
      </Navlink>
      <CollapseContainer expanded={expanded}>
        <Collapsable>
          {collapsables.map(item => (
            <Can
              key={item.label}
              perform={item.perform}
              yes={() => <Collapselink to={item.to}>{item.label}</Collapselink>}
            />
          ))}
        </Collapsable>
      </CollapseContainer>
    </Navitem>
  );
};

export default Collapse;
