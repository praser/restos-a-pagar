import React from 'react';

import { Image, Link } from './styles';
import { homePath } from '~/utils/paths';
import logo from '~/assets/caixa-logo-x.png';

const Logo = () => {
  return (
    <Link href={homePath}>
      <Image src={logo} />
    </Link>
  );
};

export default Logo;
