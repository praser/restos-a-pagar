import React from 'react';

import { render } from '@testing-library/react';
import { SmallButtonPrimary } from 'components/Button';
import { ILoteDesbloqueio } from './ILoteDesbloqueio';
import DownloadLoteDesbloqueio from './DownloadLoteDesbloqueio';

describe('Dowload lote desbloqueio', () => {
  let loteDesbloqueio: ILoteDesbloqueio;

  beforeEach(() => {
    loteDesbloqueio = {
      id: 7,
      created_at: '2020-12-16 09:41:33.670',
      sequencial: 7,
      ano: 2020,
      ce: 'CE GEOTR 0884/20 #RESERVADO 10',
      responsavelId: 'c098451',
      responsavelNome: 'Milton Mendes Da Silva',
      responsavelUnidadeId: 5385,
      responsavelUnidadeSigla: 'GEOTR',
      situacao: 'PROCESSADO',
      empenhos: 3,
    };
  });

  it('is expected to render a SmallButtonPrimary', () => {
    const { getByTestId } = render(
      <DownloadLoteDesbloqueio loteDesbloqueio={loteDesbloqueio} />,
    );

    expect(getByTestId('download-button')).toHaveAttribute(
      'href',
      `${process.env.REACT_APP_RAP_API_URL}/lotes-desbloqueio/download?jwt=asd&loteId=7`,
    );
  });
});

// Testar se é um link
// Testar se aponta para o endereço correto
