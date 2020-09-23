import React from 'react';

import { Image, Link } from './styles';

import logo from '~/assets/caixa-logo-x.png';

const Logo = () => {
  return (
    <Link>
      <Image src={logo} />
    </Link>
  );
};

export default Logo;
