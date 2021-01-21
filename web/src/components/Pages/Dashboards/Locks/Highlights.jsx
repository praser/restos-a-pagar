import React from 'react';
import { last } from 'lodash';
import {
  faCalendarAlt,
  faCameraRetro,
  faHourglassHalf,
  faLock,
  faLockOpen,
} from '@fortawesome/free-solid-svg-icons';
import { CardSmallText } from 'components/Card';
import WithZoomHover from 'components/HOC/ZoomHover';
import { Row } from '~/components/Layout';
import Highlight from '../../../Highlight';
import Progressbar from '../../../Progressbar';
import { formatDate, percentElapsedTime, remainingDays } from '~/utils/dates';
import { formatCurrencyShort, formatInteger } from '~/utils/numbers';

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

  const BloqueadosStn = () => (
    <Highlight
      icon={faCameraRetro}
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
  );

  const BloqueadosHoje = () => (
    <Highlight
      icon={faLock}
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
  );

  const DesbloqueadosAteHoje = () => (
    <Highlight
      icon={faLockOpen}
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
  );

  const AguardandoProcessamento = () => (
    <Highlight
      icon={faHourglassHalf}
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
  );

  const BloqueadosStnWithZoomHover = WithZoomHover(BloqueadosStn);
  const BloqueadosHojeWithZoomHover = WithZoomHover(BloqueadosHoje);
  const DesbloqueadosAteHojeWithZoomHover = WithZoomHover(DesbloqueadosAteHoje);
  const AguardandoProcessamentoWithZoomHover = WithZoomHover(
    AguardandoProcessamento,
  );

  return (
    <>
      <Row>
        <BloqueadosStnWithZoomHover />
        <BloqueadosHojeWithZoomHover />
        <DesbloqueadosAteHojeWithZoomHover />
        <AguardandoProcessamentoWithZoomHover />

        <Highlight
          icon={faCalendarAlt}
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
