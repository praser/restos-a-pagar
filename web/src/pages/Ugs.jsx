import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { SmallButtonPrimary } from '~/components/Button';
import { Heading } from '~/components/Layout';
import Layout from '~/components/Layout/Internal';
import { PageTitle } from '~/components/Tipography';
import { createUgPath } from '~/utils/paths';

const Ugs = () => {
  return (
    <Layout>
      <Heading>
        <PageTitle>Unidades Gestoras</PageTitle>
        <div>
          <SmallButtonPrimary as={Link} to={createUgPath}>
            <FontAwesomeIcon icon={faPlusCircle} />
            Cadastrar UG
          </SmallButtonPrimary>
        </div>
      </Heading>
    </Layout>
  );
};

export default Ugs;
