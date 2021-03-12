import React from 'react';

import { homePath } from 'utils/paths';
import logo from 'assets/caixa-logo-x.png';
import { Image, Link } from './styles';

const Logo = () => {
  return (
    <Link href={homePath}>
      <Image src={logo} />
    </Link>
  );
};

export default Logo;
