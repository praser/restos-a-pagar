import React, { ReactElement } from 'react';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { SmallButtonPrimary } from 'components/Button';
import { ILoteDesbloqueio } from './ILoteDesbloqueio';

interface IProps {
  loteDesbloqueio: ILoteDesbloqueio;
}

const DownloadLoteDesbloqueio = ({ loteDesbloqueio }: IProps): ReactElement => {
  const { id } = loteDesbloqueio;

  return (
    <SmallButtonPrimary
      as="a"
      href={`${process.env.REACT_APP_RAP_API_URL}/lotes-desbloqueio/download?jwt=asd&loteId=${id}`}
      data-testid="download-button"
    >
      <FontAwesomeIcon icon={faDownload} />
      Download do lote de desbloqueio
    </SmallButtonPrimary>
  );
};

export default DownloadLoteDesbloqueio;
