import React from 'react';
import {
  faCalendar,
  faDollarSign,
  faFileContract,
  faMoneyCheckAlt,
} from '@fortawesome/free-solid-svg-icons';
import { last } from 'lodash';
import { Row } from 'components/Layout';
import Highlight from 'components/Highlight';
import { formatCurrencyShort, formatInteger } from 'utils/numbers';
import Progressbar from 'components/Progressbar';
import { percentElapsedTime, remainingDays } from 'utils/dates';

const contextHighlightTitle = tipoInfo => {
  const { value } = tipoInfo;

  switch (value) {
    case 1:
      return 'Saldo total de empenhos inscritos em RAP';
    case 2:
      return 'Saldo passível de desbloqueio';
    default:
      return 'Saldo sem condição de desbloqueio';
  }
};

const Highlights = ({ estatisticas, dataBloqueio, tipoInfo }) => {
  const {
    quantidade_operacoes: countOperacoes,
    quantidade_notas_empenho: countEmpenhos,
    saldo_notas_empenho: balanceEmpenhos,
  } = last(estatisticas.estatisticas);

  return (
    <Row>
      <Highlight icon={faFileContract} title="Quantidade de operações">
        {formatInteger(countOperacoes)}
      </Highlight>
      <Highlight
        icon={faMoneyCheckAlt}
        title="Quantidade de notas de empenho"
        variant="success"
      >
        {formatInteger(countEmpenhos)}
      </Highlight>
      <Highlight
        icon={faDollarSign}
        title={contextHighlightTitle(tipoInfo)}
        variant="info"
      >
        {formatCurrencyShort(balanceEmpenhos)}
      </Highlight>
      <Highlight
        icon={faCalendar}
        title="Dias até o bloqueio"
        variant="warning"
      >
        <div style={{ display: 'flex' }}>
          {remainingDays(dataBloqueio)}{' '}
          <Progressbar
            width={`${percentElapsedTime(dataBloqueio)}%`}
            variant="warning"
          />
        </div>
      </Highlight>
    </Row>
  );
};

export default Highlights;
