import React from 'react';
import { last } from 'lodash';
import {
  faCalendarAlt,
  faCameraRetro,
  faFileContract,
  faHourglassHalf,
  faLock,
  faLockOpen,
  faMoneyCheckAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Row } from '~/components/Layout';
import Highlight from '../../../Highlight';
import Progressbar from '../../../Progressbar';
import { formatDate, percentElapsedTime, remainingDays } from '~/utils/dates';
import { formatCurrencyShort, formatInteger } from '~/utils/numbers';
import { CardSmallText } from 'components/Card';

const Highlights = ({
  estatisticas,
  dataCancelamento,
  dataBloqueio,
  snapshot,
  posicaoBase,
}) => {
  const {
    quantidadeOperacoesBloqueadas,
    quantidadeDocumentosBloqueados,
    saldoBloqueado,
    quantidadeOperacoesDesbloqueadas,
    quantidadeDocumentosDesbloqueados,
    saldoDesbloqueado,
    quantidadeOperacoesAguardandoDesbloqueio,
    quantidadeDocumentosAguardandoDesbloqueio,
    saldoAguardandoDesbloqueio,
  } = last(estatisticas);
  return (
    <>
      <Row>
        <Highlight
          icon={faCameraRetro}
          siblings={5}
          title={`Bloqueado STN em ${formatDate(dataBloqueio)}`}
          variant="info"
        >
          <p>{formatCurrencyShort(snapshot.saldoBloqueado)}</p>
          <CardSmallText>
            {formatInteger(snapshot.quantidadeOperacoesBloqueadas)} operações
          </CardSmallText>
          <CardSmallText>
            {formatInteger(snapshot.quantidadeDocumentosBloqueados)} notas de
            empenho
          </CardSmallText>
        </Highlight>
        <Highlight
          icon={faLock}
          siblings={5}
          title={`Bloqueado em ${formatDate(posicaoBase)}`}
          variant="danger"
        >
          <p>{formatCurrencyShort(saldoBloqueado)}</p>
          <CardSmallText>
            {formatInteger(quantidadeOperacoesBloqueadas)} operações
          </CardSmallText>
          <CardSmallText>
            {formatInteger(quantidadeDocumentosBloqueados)} notas de empenho
          </CardSmallText>
        </Highlight>

        <Highlight
          icon={faLockOpen}
          siblings={5}
          title={`Desbloqueado até ${formatDate(posicaoBase)}`}
          variant="success"
        >
          <p>{formatCurrencyShort(saldoDesbloqueado)}</p>
          <CardSmallText>
            {formatInteger(quantidadeOperacoesDesbloqueadas)} operações
          </CardSmallText>
          <CardSmallText>
            {formatInteger(quantidadeDocumentosDesbloqueados)} notas de empenho
          </CardSmallText>
        </Highlight>

        <Highlight
          icon={faHourglassHalf}
          siblings={5}
          title="Aguardando processamento"
          variant="warning"
        >
          <p>{formatCurrencyShort(saldoAguardandoDesbloqueio)}</p>
          <CardSmallText>
            {formatInteger(quantidadeOperacoesAguardandoDesbloqueio)} operações
          </CardSmallText>
          <CardSmallText>
            {formatInteger(quantidadeDocumentosAguardandoDesbloqueio)} notas de
            empenho
          </CardSmallText>
        </Highlight>
        <Highlight
          icon={faCalendarAlt}
          siblings={5}
          title="dias até o cancelamento"
          variant="warning"
        >
          <div style={{ display: 'flex' }}>
            {remainingDays(dataCancelamento)}{' '}
            <Progressbar
              width={`${percentElapsedTime(dataCancelamento, dataBloqueio)}%`}
              variant="warning"
            />
          </div>
        </Highlight>
      </Row>
    </>
  );
};

export default Highlights;
