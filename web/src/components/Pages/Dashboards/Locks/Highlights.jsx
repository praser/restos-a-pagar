import React from 'react';
import { last } from 'lodash';
import {
  faCalendarAlt,
  faFileContract,
  faHourglassHalf,
  faLock,
  faLockOpen,
  faMoneyCheckAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Row } from '~/components/Layout';
import Highlight from '../../../Highlight';
import Progressbar from '../../../Progressbar';
import { percentElapsedTime, remainingDays } from '~/utils/dates';
import { formatCurrencyShort, formatInteger } from '~/utils/numbers';

const Highlights = ({ estatisticas, dataCancelamento, dataBloqueio }) => {
  const {
    quantidadeOperacoes,
    quantidadeDocumentos,
    saldoBloqueado,
    saldoDesbloqueado,
    saldoAguardandoDesbloqueio,
  } = last(estatisticas);

  return (
    <>
      <Row>
        <Highlight
          icon={faFileContract}
          siblings={3}
          title="quantidade de operações"
        >
          {formatInteger(quantidadeOperacoes)}
        </Highlight>

        <Highlight
          icon={faMoneyCheckAlt}
          siblings={3}
          title=" quantidade de notas de empenho"
          variant="info"
        >
          {formatInteger(quantidadeDocumentos)}
        </Highlight>

        <Highlight
          icon={faCalendarAlt}
          siblings={3}
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
      <Row>
        <Highlight
          icon={faLock}
          siblings={3}
          title="Saldo bloqueado"
          variant="danger"
        >
          {formatCurrencyShort(saldoBloqueado)}
        </Highlight>

        <Highlight
          icon={faLockOpen}
          siblings={3}
          title="Saldo desbloqueado"
          variant="success"
        >
          {formatCurrencyShort(saldoDesbloqueado)}
        </Highlight>

        <Highlight
          icon={faHourglassHalf}
          siblings={3}
          title="Saldo aguardando processamento"
          variant="warning"
        >
          {formatCurrencyShort(saldoAguardandoDesbloqueio)}
        </Highlight>
      </Row>
    </>
  );
};

export default Highlights;
